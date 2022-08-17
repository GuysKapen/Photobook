import dotevn from 'dotenv'
import Category from "../models/category.js"
import Pin from "../models/pin.js"
// import User from "../models/user.js"
import bcrypt from 'bcrypt';
import mongoose from "mongoose"
dotevn.config()
//create your array. i inserted only 1 object here
function convertToSlug(Text) {
    return Text.toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
}

const rawCategories = [
    {
        name: 'cars',
        image: 'https://i.pinimg.com/750x/eb/47/44/eb4744eaa3b3ccd89749fa3470e2b0de.jpg',
    },
    {
        name: 'fitness',
        image: 'https://i.pinimg.com/236x/25/14/29/251429345940a47490cc3d47dfe0a8eb.jpg',
    },
    {
        name: 'wallpaper',
        image: 'https://i.pinimg.com/236x/03/48/b6/0348b65919fcbe1e4f559dc4feb0ee13.jpg',
    },
    {
        name: 'websites',
        image: 'https://i.pinimg.com/750x/66/b1/29/66b1296d36598122e6a4c5452b5a7149.jpg',
    },
    {
        name: 'photo',
        image: 'https://i.pinimg.com/236x/72/8c/b4/728cb43f48ca762a75da645c121e5c57.jpg',
    },
    {
        name: 'food',
        image: 'https://i.pinimg.com/236x/7d/ef/15/7def15ac734837346dac01fad598fc87.jpg',
    },
    {
        name: 'nature',
        image: 'https://i.pinimg.com/236x/b9/82/d4/b982d49a1edd984c4faef745fd1f8479.jpg',
    },
    {
        name: 'art',
        image: 'https://i.pinimg.com/736x/f4/e5/ba/f4e5ba22311039662dd253be33bf5f0e.jpg',
    }, {
        name: 'travel',
        image: 'https://i.pinimg.com/236x/fa/95/98/fa95986f2c408098531ca7cc78aee3a4.jpg',
    },
    {
        name: 'quotes',
        image: 'https://i.pinimg.com/236x/46/7c/17/467c17277badb00b638f8ec4da89a358.jpg',
    }, {
        name: 'cats',
        image: 'https://i.pinimg.com/236x/6c/3c/52/6c3c529e8dadc7cffc4fddedd4caabe1.jpg',
    }, {
        name: 'dogs',
        image: 'https://i.pinimg.com/236x/1b/c8/30/1bc83077e363db1a394bf6a64b071e9f.jpg',
    },
    {
        name: 'others',
        image: 'https://i.pinimg.com/236x/2e/63/c8/2e63c82dfd49aca8dccf9de3f57e8588.jpg',
    },
];

const categoriess = rawCategories.map((item) => new Category({ name: item.name, slug: convertToSlug(item.name), image: item.image }))

//connect mongoose
mongoose
    .connect(process.env.DB_HOST, { useNewUrlParser: true })
    .catch(err => {
        console.log(err.stack);
        process.exit(1);
    })
    .then(() => {
        console.log("connected to db in development environment");
    });


// save your data. this is an async operation
// after you make sure you seeded all the products, disconnect automatically
const catsPostSave = [];
categoriess.map(async (p, index) => {
    await p.save((err, result) => {
        catsPostSave.push(result)
        if (index === categoriess.length - 1) {
            console.log("DONE!");
            const pins = []
            for (let index = 1; index <= 33; index++) {
                pins.push(new Pin({
                    title: `Pin ${index}`,
                    destination: "https://google.com",
                    image: `uploads/media/62f1b6d43a40702f8594af60/images/pin_${index}.png`,
                    category: new mongoose.mongo.ObjectId(catsPostSave[Math.floor(Math.random() * catsPostSave.length)]._id),
                    owner: new mongoose.mongo.ObjectId("62f1b6d43a40702f8594af60"),
                    poster: new mongoose.mongo.ObjectId("62f1b6d43a40702f8594af60")
                }))
            }
            pins.map(async (p, index) => {
                await p.save((err, result) => {
                    if (index === pins.length - 1) {
                        console.log("DONE!");
                        // mongoose.disconnect();
                    }
                });
            });
        }
    });
});


// const users = [
//     new User({
//         _id: new mongoose.mongo.ObjectId('59b50d152d9f6b4110ec9a68'),
//         email: 'user@mail.com',
//         plainPassword: 'password',
//         role: 'user',
//         items: []
//     }),
//     new User({
//         _id: new mongoose.mongo.ObjectId('62f1b6d43a40702f8594af60'),
//         email: 'admin@mail.com',
//         plainPassword: 'password',
//         role: 'admin',
//     }),
// ]

// users.map(async (p, index) => {
//     console.log(p);
//     await p.save((err, result) => {
//         if (index === users.length - 1) {
//             console.log("DONE!");
//             // mongoose.disconnect();
//         }
//     });
// });