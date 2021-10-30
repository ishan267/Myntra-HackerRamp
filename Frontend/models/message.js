class message{
    constructor(id,createdAt,text,receiverId,senderId,tag,productDiscussed){
        this.id=id;
        this.createdAt=createdAt;
        this.text=text;
        this.receiverId=receiverId;
        this.senderId=senderId
        this.tag=tag; 
        this.productsDiscussed=productDiscussed;   

    }
}
export default message;