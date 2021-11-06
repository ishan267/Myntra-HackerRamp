class Session {
  constructor(id, title,date, time, friendsId, adminId,carts) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.time = time;
    this.members = friendsId;
    this.adminId = adminId;
  }
}

export default Session;
