![TeleComic](https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/436/582/datas/original.png)
## 💭 TeleComic
> For the full version of this page including generated comic samples, please visit the project's Devpost page https://devpost.com/software/comicsensai.

TeleComic is a web application inspired by the desire to provide the average person, who might not have either writing or artistic expertise, with an innovative solution to design their own comics using AI! The application was built in 24h by our team formed of 4 high school students, as part of an international hackathon [HackKosice 2023](https://hackkosice.com/hackathon/2023/). The project was awarded 3rd place in the overall category, closing the top 3 best hacks created.

The interface lets you create your own characters, which you can then use to create your own comic to add to your collection. Not creative? No worries, AI is here to help you with generating characters and your storyline - because that's essentially all you need. Afterwards it's the job of AI to create the narratives of the characters and to generate the respective comic panels (up to 12 in one comic). And, if you don't like anything, you can always get back to the versatile editor and update anything you'd like.

As a suggestion for the future, a marketplace with all generated comics was added and we also suggested an optimal subscription system, including benefits for creators.

## 🏗 How we built it
We use a wide variety of programing languages and tools. Frontend of the application was built in JavaScript with React and is served by NextJS. Our backend server is engineered in Python and uses the Flask library ([project's repository](https://github.com/TomasHutnan/ai-comics-generation_hk)). Data displayed and provided to the end user are stored in MongoDB.

We use OpenAI models for content generation. More specifically, for text generation (stories, narratives etc.) we utilized the Davinci-003 model and all the artwork was handled by the Dall-E model.

## ⁉ Challenges and accomplishments
At first the biggest problem was getting the correct type of images. We tested many different prompts and keywords, that heavily varied the consistency between the different comic panels. Ultimately, we ended up with a very consistent and characteristic image descriptor.

From our initial tests, we thought that the generated images would look much worse than they do now. With rigorous testing, we managed to bring their quality to industry standard, and higher.

We learned a lot about prompting the AI, in other words, getting it to give us what we are looking for. Other than that, we figured out how to work with APIs better and connect them to our server.
