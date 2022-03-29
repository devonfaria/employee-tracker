// Employee Constructor
class Employee {
  constructor(first, last, role_ID) {
      this.first_name = first;
      this.last_name = last;
      this.role_ID = role_ID;
  };
  getFirst() {
    return this.first_name
  };
  getLast() {
    return this.last_name
  };
  getRoleID() {
    return this.role_ID
  };
};

module.exports = Employee;