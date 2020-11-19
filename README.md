# My first Java Script - ToDo-List

_No focus on design in this task._
Also in this school assignment we are learning how to use Github. I created branch "refactoring" and made changes locally in that branch. Pushed it and merged it directly to master branch. In larger projects I am aware of using "develop" branch, and not go directly to master. But this is practice! :-)

## Functionality:

3 hardcoded examples in the todolist.

- Add New ToDo ('Enter' key is activated)
- Remove ToDo
  (Remove from screen - toggle complete value false/true, push to last i position in array)
- Reset Removed ToDo's
  (toggle complete value true/false, splice, unshift to place object to first position in array)
- Delete Todo's
  (Empties array)
- Sort ToDo's (move pressed ToDo => top of the list)

**Added localStorage to my To Do List**

## Structure:

- camelCase
- let not var
- describing variables - no commenting should be necessary
- minimal code in window onload (call functions instead)

## Lighthouse

We learned about Lighthouse: 100% Performance. 65% Accessibility. 100% Best Practices. 91% Seo.
I used the information given and improved my Accessibility to 90%.

## Comment:

**This is my first project in JS.** Focus in the task is to learn JS basics and working with objects. First I created two arrays, one for displaying todos, and one for removed. It was much easier to toggle between the to arrays, then I wondered if I could do it using only one array. It was a little bit more complicated to do, but I made it work. Not sure what would be preffered in the long run.

## Question for improvement:

I created the reset button in HTML with onclick. Since I have unique ID's on all my elements, I would like to be able to work with that for the toggle, but I do not know at this stage how to do that using the structure that I have set up the reset button with. Guidance much appreciated! :)
