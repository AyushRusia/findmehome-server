import graphql from "graphql";

const schema = graphql.buildSchema(`

type Landlord{
    _id:ID
    name:String
    email:String
    city:String
    address:String
    phone:String
    houseCount:Int
    house:[House!]

}

enum Status{
    FULL
    EMPTY
}
type House{
    _id:ID
    name:String
    city:String
    address:String
    rent:Float
    dimensions:String
    houseType:String
    owner:ID
    totalSharing:Int
    currentSharing:Int
    status:Status
    tenant:[Tenant!]
    description:String
}
enum gender{
    MALE
    FEMALE
}
type Tenant{
    _id:ID
    name:String
    email:String
    phone:String
    city:String
    address:String
    gender:gender
    bookedHouse:House
}

type RootQuery{
    getAllLandlords:[Landlord!]
    getAllTenants:[Tenant!]
    getAllHouses:[House!]
}

input HouseInput{
    name:String!
    city:String!
    address:String!
    rent:Float!
    dimensions:String
    houseType:String
    description:String
    totalSharing:Int!
}
type RootMutation{
    createHouse(HouseInput:HouseInput):House
}
schema{
    query:RootQuery
    mutation:RootMutation
}
`);

export default schema;
