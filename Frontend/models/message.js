class message{
    constructor(id,createdAt,receiverId,senderId,tag,productDiscussed,text,){
        this.id=id;
        this.createdAt=createdAt;
        this.text=text;
        this.receiverId=receiverId;
        this.senderId=senderId
        this.tag=tag; 
        this.productDiscussed=productDiscussed;   

    }
}
export default message;