let id = require('pow-mongodb-fixtures').createObjectId;

const tasks = exports.tasks = {
    task1: {
        _id: id(),
        name: 'Task 1 : Learn React',
        desc:'This is dummy text for Task 1, It has been added to see the app with Data.',
        startDate : "2019-09-23",
        endDate : "2019-09-23",
        duration : 123,
    },
    task2: {
        _id: id(),
        name: 'Task 2 : Something else',
        desc:'This is dummy text for Task 2, It has been added to see the app with Data.',
        startDate : "2019-09-23",
        endDate : "2019-09-23",
        duration : 50,
    },
    task3: {
        _id: id(),
        name: 'Task 3 : Time Tracker app',
        desc:'I am using node/Express and ReactJs, Redux to make the Time tracker app',
        startDate : "2019-09-23",
        endDate : "2019-09-23",
        duration : 1050,
    },
    task4: {
        _id: id(),
        name: 'Task 4',
        desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
        startDate : "2019-09-23",
        endDate : "2019-09-23",
        duration : 100123,
    },
    task5: {
        _id: id(),
        name: 'Task 5',
        desc:'when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
        startDate : "2019-09-23",
        endDate : "2019-09-23",
        duration : 10050,
    },
    task6: {
        _id: id(),
        name: 'Task 6',
        desc:'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy',
        startDate : "2019-09-23",
        endDate : "2019-09-23",
        duration : 254,
    },
    task7: {
        _id: id(),
        name: 'Task 7',
        desc:' making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
        startDate : "2019-09-23",
        endDate : "2019-09-23",
        duration : 400,
    }
};
