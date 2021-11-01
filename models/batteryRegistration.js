class BatteryRegistration {
  constructor(
    userId,
    barcode,
    brand,
    type,
    warrantyPeriod,
    dateInstalled,
    model,
    shopName,
    shopProvince,
    shopDistrict,
    shopPhoneNumber,
    id
  ) {
    this.userId = userId;
    this.barcode = barcode;
    this.brand = brand;
    this.type = type;
    this.warrantyPeriod = warrantyPeriod;
    this.dateInstalled = dateInstalled;
    this.model = model;
    this.shopName = shopName;
    this.shopProvince = shopProvince;
    this.shopDistrict = shopDistrict;
    this.shopPhoneNumber = shopPhoneNumber;
    this.id = id;
  }
}

export default BatteryRegistration;
