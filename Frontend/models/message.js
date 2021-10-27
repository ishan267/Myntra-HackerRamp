class message{
    constructor(id,receiverId,senderId,tag,time,productDiscussed,text,){
        this.id=id;
        this.receiverId=receiverId;
        this.senderId=senderId
        this.tag=tag; 
        this.time=time;
        this.productDiscussed=productDiscussed;
        this.text=text;

    }
}
export default message;