const { rentalValidator: validator } = require('../utils/validators');
class Rental {
  constructor(params) {
    this.id = params.id;
    this.type = params.type;
    this.plate = params.plate;
    this.brand = params.brand;
    this.model = params.model;
    this.year = params.year;
    this.travelled = params.travelled;
    this.priceMonthly = params.priceMonthly;
    this.priceDayly = params.priceDayly;
    this.clientId = params.clientId;
    this.bills = params.bills;
  }
}
//client
const lookUpRentals = async (prismaClient, filterParam, sortParam) => {
  try {
    let filter = [{ clientId: { equals: null } }];
    let sort = [];
    const validSort = validator.sort(sort, sortParam);
    if (validSort) {
      sort = validSort;
    }
    const validFilter = validator.filter(filter, filterParam);
    if (validFilter) {
      filter = validFilter;
    }

    const response = await prismaClient.rental.findMany({
      where: { AND: filter },
      orderBy: sort,
    });
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      success: false,

      error: { message: error.message },
    };
  }
};
const lookUpRental = async (prismaClient, id) => {
  if (!validator.id(id)) {
    return {
      success: false,
      error: { message: 'Id must be valid' },
    };
  }
  try {
    const rental = await prismaClient.rental.findUnique({
      where: { id: id },
    });
    if (!rental)
      return {
        success: false,
        message: 'No Rental with given id',
      };

    if (rental.clientId) {
      return {
        success: false,
        message: 'Rental has a client already',
      };
    }
    return {
      success: true,
      data: rental,
    };
  } catch (error) {
    return {
      success: false,
      error: { message: error.message },
    };
  }
};
const rentRental = async (prismaClient, id, userId) => {
  if (!validator.id(id)) {
    return {
      success: false,
      error: { message: 'Id must be valid' },
    };
  }
  const rental = await prismaClient.rental.findUnique({ where: { id: id } });
  if (!rental)
    return {
      success: false,
      error: { message: 'No Rental with given id' },
    };

  if (rental.clientId)
    return {
      success: false,
      error: { message: 'Rental has a client already' },
    };
  try {
    const response = await prismaClient.rental.update({
      where: { id: id },
      data: {
        client: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      error: { message: error.message },
    };
  }
};
const returnRental = async (prismaClient, id, userId) => {
  if (!validator.id(id)) {
    return {
      success: false,
      error: { message: 'Id must be valid' },
    };
  }
  const rental = await prismaClient.rental.findUnique({ where: { id: id } });
  if (!rental)
    return {
      success: false,
      message: 'No Rental with given id',
    };
  if (!rental.clientId)
    return {
      success: false,
      message: 'Rental has no client therefore Rental cannot return',
    };
  try {
    const response = await prismaClient.rental.update({
      where: { id: id },
      data: {
        client: {
          disconnect: true,
        },
      },
    });
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      error: { message: error.message },
    };
  }
};
//management
const getAllRentals = async (prismaClient) => {
  try {
    const response = await prismaClient.rental.findMany();
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      error: { message: error.message },
    };
  }
};
const deleteAllRentals = async (prismaClient) => {
  try {
    const response = await prismaClient.rental.deleteMany();
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      error: { message: error.message },
    };
  }
};
const createRental = async (prismaClient, data) => {
  const validation = validator.rental(data);
  if (!validation.valid) {
    return {
      success: false,
      error: { message: validation.message },
    };
  }
  try {
    const regControl = await registerControl(prismaClient, data.plate);
    if (regControl.registered) {
      return {
        success: false,
        error: { message: regControl.message },
      };
    }
    const response = await prismaClient.rental.create({ data: data });
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      error: { message: error.message },
    };
  }
};
const getRental = async (prismaClient, id) => {
  if (!validator.id(id)) {
    return {
      success: false,
      error: { message: 'Id must be valid' },
    };
  }
  try {
    const rental = await prismaClient.rental.findUnique({
      where: {
        id: id,
      },
    });
    if (rental) {
      return {
        success: true,
        data: rental,
      };
    } else {
      return {
        success: false,
        error: { message: 'No rental found with given id' },
      };
    }
  } catch (error) {
    return {
      success: false,
      error: { message: error.message },
    };
  }
};
const updateRental = async (prismaClient, id, data) => {
  const updtControl = await updateControl(prismaClient, id, data);
  if (updtControl.inconvience) {
    return {
      success: false,
      error: { message: updtControl.message },
    };
  }
  try {
    const response = await prismaClient.rental.update({
      where: { id: id },
      data: data,
    });
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      error: { message: error.message },
    };
  }
};
const deleteRental = async (prismaClient, id) => {
  if (validator.id(id)) {
    return {
      success: false,
      error: { message: 'Given id is not valid' },
    };
  }
  const rental = await prismaClient.rental.findUnique({
    where: {
      id: id,
    },
  });
  if (rental) {
    const response = await prismaClient.rental.delete({ where: { id: id } });
    return {
      success: true,
      data: response,
    };
  } else {
    return {
      success: false,
      error: { message: 'No rental found with given id' },
    };
  }
};
const registerControl = async (prismaClient, plate) => {
  const rental = await prismaClient.rental.findUnique({
    where: {
      plate: plate,
    },
  });
  if (rental) {
    return {
      registered: true,
      message: 'A rental exists with given plate exists already',
    };
  } else {
    return {
      registered: false,
    };
  }
};
const updateControl = async (prismaClient, id, data) => {
  if (!validator.id(id)) {
    return {
      inconvience: true,
      message: 'Id must be valid',
    };
  }
  const validation = validator.rental(data);
  if (!validation.valid) {
    return {
      inconvience: true,
      message: validation.message,
    };
  }
  const rental = await prismaClient.rental.findUnique({ where: { id: id } });
  if (!rental) {
    return {
      inconvience: true,
      message: 'No Rental with given id',
    };
  }
  const rentalwPlate = await prismaClient.user.findUnique({
    where: { username: data.plate },
  });
  if (rentalwPlate) {
    if (!(rentalwPlate.id === rental.id)) {
      return {
        inconvience: true,
        message: 'Rental with given plate exists already',
      };
    }
  }
  return { inconvience: false };
};
module.exports = {
  getAllRentals,
  deleteAllRentals,
  createRental,
  getRental,
  updateRental,
  deleteRental,
  lookUpRentals,
  lookUpRental,
  rentRental,
  returnRental,
};
