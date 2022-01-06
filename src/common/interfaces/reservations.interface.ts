
class CustomerInfoInterface {
  name!: string;

  lastName!: string;

  capacity!: string;

  location!: string;

  count!: string;

  phoneNumber!: string
}

export class ReservationInterface {
  uuid!: string;

  tableId!: string;

  bookedTime!: string;

  CustomerInfo!: CustomerInfoInterface;

  createdAt!: Date;

  updatedAt!: Date;
}
