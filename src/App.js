import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {
// adding the URL in a variable
const url = "https://dogs-backend-ma.herokuapp.com";
// creating a state to hold the list of dogs
const [dogs, setDogs] = React.useState([]);

 // Empty Dog - For the Create Form
 const emptyDog = {
  name: "",
  age:0,
  img: ""
}

//SELECTED DOG STATE. this state is to creat the update component on our page. we first creat the state. 
const [selectedDog, setSelectedDog] = React.useState(emptyDog);

// git list of the dogs function
const getDogs = () => {
  // make a get request to this url
  fetch(url + "/dog/")
  // use .then to take action when the response comes in. the function takes the response and 
  // convert data into json object
    .then((response) => response.json())
    // use the data from response
    .then((data) => {
      setDogs(data);
    });
};


// handleCreat - function for when the cresat form is submitted. doing this step after we creat the emptyDog const above ^
// after creating the below functions we need to pass it to our creat rout down below. and update it.
const handleCreate = (newDog) => {
  fetch(url + "/dog/", {
    method: "POST",
    headers: {
      // content type of the body is json. so have to add below header
      "Content-Type":"application/json"
    },
    body: JSON.stringify(newDog)
  })
  .then(() => getDogs())
}

// handleUpdate - function for when the edit form is submitted. we do this after the update state we created above under the creat state. making the Put requestion and updating the list of dogs. 
  // handleUpdate - function for when the edit form is submitted
  const handleUpdate = (dog) => {
    fetch(url + "/dog/" + dog._id, {
      method: "PUT",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(dog)
    })
    .then(() => getDogs())
  }

  // select funtion to specify which dog we are updated.
  const selectDog = (dog) => {
    setSelectedDog(dog)
  }
  // now we need to pass this down to our display route down below in return. 


  // deleteDog to delete inidividual dogs. we define it here and then create the props down in the return in display router and then pass it to display.js and creat the button. 
  const deleteDog = (dog) => {
    fetch(url + "/dog/" + dog._id, {
      method: "delete"
    })
    .then(() => {
      // don't need the response from the post but will be using the .then to update the list of dogs.
      // after deleting the dog, return the dogs lists
      getDogs()
    })
  }
  // now down below in the return we need to creat the delet props in our display router, then pass it to display.js


// useEffect, to get the data right away after components loads
React.useEffect(() => getDogs(), []);




  return (
    <div className="App">
      <h1>DOG LISTING SITE</h1>
      <hr />
      {/* we are adding the the add dog button to make my creat handlesubmit works. */}
      <Link to="/create">
        <button>Add Dog</button>
      </Link>
      <main>
        <Switch>
          {/* creating the dog props so we can pass it to the child component which is the display.js */}
          <Route
            exact
            path="/"
            render={(rp) => (
              <Display 
              {...rp} 
              dogs={dogs} 
              selectDog={selectDog}
              deleteDog={deleteDog} 
              />
            )}
          />
        <Route
            exact
            path="/create"
            render={(rp) => (
              <Form {...rp} label="create" dog={emptyDog} handleSubmit={handleCreate} />
            )}
          />
                   <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form 
              {...rp} 
              label="update" 
              dog={selectedDog} 
              handleSubmit={handleUpdate} />
            )}
          />

        </Switch>
      </main>
    </div>
  );
}

export default App;
