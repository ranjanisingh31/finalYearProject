export interface confirmBookingChauffeurDrive {
  type: string;
  transferType: String;
  pickupAddress: String;
  toCity: String;
  city: string;
  deliveryAddress: string;
  startDate: Date;
  endDate: Date;
  vehicle: string;
  clientDetails: {
    fullName: string;
    email: string;
    mobile: string;
    gender: string;
    dob: Date;
  };
  selectedVehicleDetails: {
    _id: string;
    img: string;
    name: string;
    price: number;
    mode: string;
    door: number;
    seat: number;
    luggage: number;
  };
  message: string;
}
