import React from "react";

const Display = (props) => {
  
// destruct the dogs from props
const { dogs } = props
// in another way we could do this
// const dogs = props.dogs
// const history = props.hisotry
// const      = props.         I don't know what was here. 

  // Returns the JSX for when you have dogs
  const loaded = () => (
    <div style={{textAlign: "center"}}>
      {dogs.map((dog) => (
        <article key={dog._id}>
          <img src={dog.img}/>
          <h1>{dog.name}</h1>
          <h3>{dog.age}</h3>
          {/* adding the below button after creating the edit function in our app.js file. */}
          <button onClick={() => {
            props.selectDog(dog)
            // git history from dev tool on the server
            props.history.push("/edit")
          }}>
            edit
          </button>
          {/* after creating the delet function in our app.js we pass that as props to display.js and creat the button */}
          <button onClick={() => {
            props.deleteDog(dog)
          }}>
            Delete
          </button>

        </article>
      ))}
    </div>
  )

 // adding the loading function for when there is no dog to display

  const loading = () => <h1>Loading</h1>

  return dogs.length > 0 ? loaded() : loading()
};

 



export default Display;


// app.js is holding the dogs data but not displaying. in order to get displayed we need to pass the data as props to the display file and in order to to that we need to creat the dog props in app.js file which is the parent and then pass it down to the child which is the display.js. 