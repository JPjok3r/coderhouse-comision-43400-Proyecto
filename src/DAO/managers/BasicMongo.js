export default class BasicMongo{
    constructor(model, populateOpt){
        this.model = model;
        this.populateOpt = populateOpt || null;
    }

    async getAll() {
        if(this.populateOpt)
            return await this.model.find().populate(this.populateOpt);
        else
            return await this.model.find();
    }

    async getById(id){
        if(this.populateOpt)
            return await this.model.findById(id).populate(this.populateOpt);
        else
            return await this.model.findById(id);
    }

    async createOne(obj){
        return await this.model.create(obj);
    }

    async updateOne(id, obj){
        console.log(id, obj);
        return await this.model.findByIdAndUpdate(id, obj, {new: true});
    }

    async deleteOne(id){
        return await this.model.findByIdAndDelete(id);
    }
}