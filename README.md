# Notes
## 2023-04-14 @ 21.10h EST
I've put together a quick CLI version of "parse the JSON, get available trucks, show user" in the first hour of monkeying with the thing.  I've stubbed out the UX for an API-backed version of the same.  I'll commit the UX with a direct "pull and parse" like the CLI first, then - if I can carve out the time - add some CI bits for a TS/node service (deployable to AWS Lambda) that could do the parsing/delivery on that platform instead.

## 2023-04-17 @ 09.00h EST
I've added the backbone of a TS/node lambda API for filtering the trucks, along with a "card" for each truck in a proto-UX consuming the API.  With a week of working days, this could be a "food truck app" that you could use on desktop or mobile without a lot of effort (and likely whitebox for any area publishing similar data).

## 2023-04-17 @ 11.00h EST
You can open the `./ux/crafted/index.html` in a local browser and see the proto-UX for the service (which is alive - as of the timestamp above - on my homelab).  I'll let it run through Friday, 2023-04-21.  Send me a message if you'd like me to restart it for some reason.

You can review the endpoints in the `./ux/service/app/app.js` file and should be able to hit any of them in a browser/CURL session as well.

## ORIGINAL README.md follows
---
# Engineering Challenge

We strive to be a practical and pragmatic team. That extends to the way that we work with you to understand if this team is a great fit for you. We want you to come away with a great understanding of the kind of things that we actually do day to day and what it is like to work in our teams.

We don't believe that whiteboard coding with someone watching over your shoulder accurately reflects our day to day. Instead we'd like to be able to discuss code that you have already written when we meet.

This can be a project of your own or a substantial pull request on an open source project, but we recognize that most people have done private or proprietary work and this engineering challenge is for you.

We realize that taking on this assignment represents a time commitment for you, and we do not take that lightly. Throughout the recruitment process we will be respectful of your time and commit to working quickly and efficiently. This will be the only technical assessment you'll be asked to do. The brief following conversations will be based on this assessment and your prior experiences.

## Challenge Guidelines

* This is meant to be an assignment that you spend approximately two to three hours of focused coding. Do not feel that you need to spend extra time to make a good impression. Smaller amounts of high quality code will let us have a much better conversation than large amounts of low quality code.

* Think of this like an open source project. Create a repo on Github, use git for source control, and use a Readme file to document what you built for the newcomer to your project.

* We build systems engineered to run in production. Given this, please organize, design, test, deploy, and document your solution as if you were going to put it into production. We completely understand this might mean you can't do much in the time budget. Prioritize production-readiness over features.

* Think out loud in your documentation. Write our tradeoffs, the thoughts behind your choices, or things you would do or do differently if you were able to spend more time on the project or do it a second time.

* We have a variety of languages and frameworks that we use, but we don't expect you to know them ahead of time. For this assignment you can make whatever choices that let you express the best solution to the problem given your knowledge and favorite tools without any restriction. Please make sure to document how to get started with your solution in terms of setup so that we'd be able to run it.

* Once this is functioning and documented to your liking, either send us a link to your public repo or compress the project directory, give the file a pithy name which includes your own name, and send the file to us.

## The Challenge

As the song says, "you've got to play the hand you're dealt", and in this case your hand is to implement something to help us manage our food truck habit.

Our team loves to eat. They are also a team that loves variety, so they also like to discover new places to eat.

In fact, we have a particular affection for food trucks. One of the great things about Food Trucks in San Francisco is that the city releases a list of them as open data.

Your assignment is to make it possible for our teams to do something interesting with this food trucks data.

This is a freeform assignment. You can write a web API that returns a set of food trucks. You can write a web frontend that visualizes the nearby food trucks for a given place. You can create a CLI that lets us get the names of all the taco trucks in the city. You can create system that spits out a container with a placeholder webpage featuring the name of each food truck to help their marketing efforts. You're not limited by these ideas at all, but hopefully those are enough help spark your own creativity.
San Francisco's food truck open dataset is [located here](https://data.sfgov.org/Economy-and-Community/Mobile-Food-Facility-Permit/rqzj-sfat/data) and there is an endpoint with a [CSV dump of the latest data here](https://data.sfgov.org/api/views/rqzj-sfat/rows.csv). We've also included a copy of the data in this repo as well.
