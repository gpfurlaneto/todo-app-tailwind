const express = require("express");
const mongoose = require("mongoose");
const { database, todoSchema } = require("./database");

const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.listen(3000, () => {
  console.log("The server is active on port 3000");
});

app.post("/todos", async (request, response) => {
  const Todo = mongoose.model("todos", todoSchema);
  const todo = new Todo({
    name: request.body.name,
    status: "incomplete",
  });

  todo
    .save()
    .then(() => {
      console.log("Save todo at MongoDB");
    })
    .catch((error) => {
      console.error(error);
    });

  response.send("ok");
});

app.put("/todos/:id", async (request, response) => {
  const name = request.body.name;
  const Todo = mongoose.model("todos", todoSchema);
  await Todo.updateOne(
    { _id: request.params.id },
    {
      name,
    }
  );
  response.send("ok");
});

app.get("/todos", async (request, response) => {
  const Todo = mongoose.model("todos", todoSchema);
  const todos = await Todo.find({});
  response.send(todos);
});

app.put("/todos/status/:id", async (request, response) => {
  const status = request.body.status;
  const Todo = mongoose.model("todos", todoSchema);
  await Todo.updateOne(
    { _id: request.params.id },
    {
      status,
    }
  );
  response.send("ok");
});

app.delete("/todos/:id", async (request, response) => {
  const Todo = mongoose.model("todos", todoSchema);
  await Todo.deleteOne({ _id: request.params.id });
  response.send("ok");
});
