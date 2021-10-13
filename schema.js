import axios from 'axios';
import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GrapQLNonNull, GraphQLNonNull } from 'graphql';


// worker type
const WorkerType = new GraphQLObjectType({
    name: 'Worker',
    fields:() => ({
        id: {type:GraphQLString},
        firstName: {type:GraphQLString},
        lastName: {type:GraphQLString},
        middleName: {type:GraphQLString},
        phone: {type:GraphQLString},
        email: {type:GraphQLString},
        country: {type:GraphQLString},
        city: {type:GraphQLString},
        skills: {type:GraphQLString},
    })
});

// employer type
const EmployerType = new GraphQLObjectType({
    name: 'Employer',
    fields:() => ({
        id: {type:GraphQLString},
        firstName: {type:GraphQLString},
        lastName: {type:GraphQLString},
        middleName: {type:GraphQLString},
        phone: {type:GraphQLString},
        email: {type:GraphQLString},
        country: {type:GraphQLString},
        city: {type:GraphQLString},
        skills: {type:GraphQLString},
    })
});

// job type
const JobType = new GraphQLObjectType({
    name: 'Job',
    fields:() => ({
        id: {type:GraphQLString},
        jobName: {type:GraphQLString},
        description: {type:GraphQLString},
        pricePerHour: {type:GraphQLString}
    })
})

// Root Query
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        worker:{
            type:WorkerType,
            args:{
                id:{type:GraphQLString}
            },
            resolve(parentValue, args){
                return axios.get('http://localhost:3000/workers/'+ args.id)
                .then(res => res.data);
            }
        },
        workers:{
            type: new GraphQLList(WorkerType),
            resolve(parentValue, args){

                return axios.get('http://localhost:3000/workers')
                .then(res => res.data);
            }
        },

        employer:{
            type:EmployerType,
            args:{
                id:{type:GraphQLString}
            },
            resolve(parentValue, args){
                return axios.get('http://localhost:3000/employers/'+ args.id)
                .then(res => res.data);
            }
        },
        employers:{
            type: new GraphQLList(EmployerType),
            resolve(parentValue, args){

                return axios.get('http://localhost:3000/employers')
                .then(res => res.data);
            }
        },

        job:{
            type:JobType,
            args:{
                id:{type:GraphQLString}
            },
            resolve(parentValue, args){
                return axios.get('http://localhost:3000/jobs/'+ args.id)
                .then(res => res.data);
            }
        },
        jobs:{
            type: new GraphQLList(JobType),
            resolve(parentValue, args){

                return axios.get('http://localhost:3000/jobs')
                .then(res => res.data);
            }
        },
    }
});

// Mutations
const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addWorker:{
            type:WorkerType,
            args:{
                firstName: {type: new GraphQLNonNull(GraphQLString)},
                lastName: {type: new GraphQLNonNull(GraphQLString)},
                middleName: {type: new GraphQLNonNull(GraphQLString)},
                phone: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                country: {type: new GraphQLNonNull(GraphQLString)},
                city: {type: new GraphQLNonNull(GraphQLString)},
                skills: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parentValue, args){
                return axios.post('http://localhost:3000/workers', {
                    firstName: args.firstName,
                    lastName: args.lastName,
                    middleName: args.middleName,
                    phone: args.phone,
                    email: args.email,
                    country: args.country,
                    city: args.city,
                    skills: args.skills
                })
                .then(res => res.data);
            }
        },
        deleteWorker:{
            type:WorkerType,
            args:{
               id:{type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args){
                return axios.delete('http://localhost:3000/workers/'+ args.id)
                .then(res => res.data);
            }
        },
        editWorker:{
            type:WorkerType,
            args:{
                firstName: {type: new GraphQLNonNull(GraphQLString)},
                lastName: {type: GraphQLString},
                middleName: {type: GraphQLString},
                phone: {type: GraphQLString},
                email: {type: GraphQLString},
                country: {type: GraphQLString},
                city: {type: GraphQLString},
                skills: {type: GraphQLString},
            },
            resolve(parentValue, args){
                return axios.post('http://localhost:3000/workers/'+args.id, args)
                .then(res => res.data);
            }
        },

        addEmployer:{
            type:EmployerType,
            args:{
                firstName: {type: new GraphQLNonNull(GraphQLString)},
                lastName: {type: new GraphQLNonNull(GraphQLString)},
                middleName: {type: new GraphQLNonNull(GraphQLString)},
                phone: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                country: {type: new GraphQLNonNull(GraphQLString)},
                city: {type: new GraphQLNonNull(GraphQLString)},
                skills: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parentValue, args){
                return axios.post('http://localhost:3000/employers', {
                    firstName: args.firstName,
                    lastName: args.lastName,
                    middleName: args.middleName,
                    phone: args.phone,
                    email: args.email,
                    country: args.country,
                    city: args.city,
                    skills: args.skills
                })
                .then(res => res.data);
            }
        },
        deleteEmployer:{
            type:EmployerType,
            args:{
               id:{type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args){
                return axios.delete('http://localhost:3000/employers/'+ args.id)
                .then(res => res.data);
            }
        },
        editEmployer:{
            type:EmployerType,
            args:{
                firstName: {type: new GraphQLNonNull(GraphQLString)},
                lastName: {type: GraphQLString},
                middleName: {type: GraphQLString},
                phone: {type: GraphQLString},
                email: {type: GraphQLString},
                country: {type: GraphQLString},
                city: {type: GraphQLString},
                skills: {type: GraphQLString},
            },
            resolve(parentValue, args){
                return axios.post('http://localhost:3000/employers/'+args.id, args)
                .then(res => res.data);
            }
        },

        addJob:{
            type:JobType,
            args:{
                jobName: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: new GraphQLNonNull(GraphQLString)},
                pricePerHour: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parentValue, args){
                return axios.post('http://localhost:3000/jobs', {
                    jobName: args.jobName,
                    description: args.description,
                    pricePerHour: args.pricePerHour,
                })
                .then(res => res.data);
            }
        },
        deleteJob:{
            type:JobType,
            args:{
               id:{type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args){
                return axios.delete('http://localhost:3000/jobs/'+ args.id)
                .then(res => res.data);
            }
        },
        editJob:{
            type:JobType,
            args:{
                jobName: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: GraphQLString},
                pricePerHour: {type: GraphQLString},
            },
            resolve(parentValue, args){
                return axios.post('http://localhost:3000/jobs/'+args.id, args)
                .then(res => res.data);
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});