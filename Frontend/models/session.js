class Session {
  constructor(id, title, time, friends, adminId) {
    this.id = id;
    this.title = title;
    this.time = time;
    this.members = friends;
    this.adminId = adminId;
  }
}

export default Session;
