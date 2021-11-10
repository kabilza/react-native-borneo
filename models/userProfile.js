class UserProfile {
  constructor(
    userId,
    name,
    age,
    homeAddress,
    phoneNumber,
    facebook,
    line,
    profileImageUrl
  ) {
    this.userId = userId;
    this.name = name;
    this.age = age;
    this.homeAddress = homeAddress;
    this.phoneNumber = phoneNumber;
    this.facebook = facebook;
    this.line = line;
    this.profileImageUrl = profileImageUrl;
  }
}

export default UserProfile;
