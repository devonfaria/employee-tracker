class Role {
  constructor(title, salary, dept_ID) {
      this.title = title;
      this.salary = salary;
      this.dept_ID = dept_ID;
  };
  getTitle() {
    return this.title
  };
  getSalary() {
    return this.salary
  };
  getDeptID() {
    return this.dept_ID
  };
};

module.exports = Role;