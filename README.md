# Time Tracking APP

This app is made with ReactJS in the frontend and Express/Node.JS + MongoDB in the backend.

>I used symfony in my end-of-studies Internship of my bachelor's degree but that was from 2016, I used Express/Node.JS here because I didn't want to wast time remembering symfony.

To run the app :
- Run the server :
```sh
$ cd TimeTracking
$ docker build .
$ docker-compose up
```
- If everything work fine, we can start our client :
```sh
$ cd TimeTracking/client
$ npm install
$ npm start
```

# About The Work!

I started working on this assignment Sunday afternoon, I also spent Monday night working on it and I am writing this documentation on Tuesday, so if I count the total amount of time I spent, I guess it will be an entire day maybe a little more.
I was able to finish what is asked and If I had more time I would have improved some parts like the search/filter...

# What did I like about this project ?
- Using react, I spent most of the time dealing with react in the frontend and react is becoming one of my best JavaScript library.
- I also did like a docker, I used it before, but I wasn't fully familiar with it, so when I used it now I felt the importance of it, from now on I will be using it in all my projects.
- The countUp timer seems hard at first, but it was easy I enjoyed doing it.

# What I didn't like ?

- I did like docker, but I had problems with it! I am not familiar with it yet, so for example When I added a new dependency to the project, the dependency didn't get installed, it' like the container can't see the new package.jason file it always run the old version one. I wasted time trying to figure this out, but at the end, I entered the container with shell and installed the dependency manually.

# What will I do If I had more time ?
If I had more time I would have improved the search/filter part, like do a filter for the longest tasks maybe make a calendar...
As currently a student now I don't have much free time, except the weekend, so I tried to finish with the main functions ASAP but doing advanced filter or calendar seems like a nice idea.

# Which part I am satisfied with ?
I am satisfied with the entire app in general, I did have some annoying bugs, but I took my time to fix them and make the app work fine with no bugs.

# Something needs improvement?
- Like I said before maybe do an advanced search/filter... 
- The pages and pagination need improvement, I am getting this console error : Cannot update during an existing state transition (I had to do it to see instant changes without reloading the page).