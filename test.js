let state = {
  animals: [
    {
      id: 1,
      name: "Tiger",
      age: 10,
    },
    {
      id: 2,
      name: "Cat",
      age: 5,
    },
    {
      id: 3,
      name: "Cow",
      age: 2,
    },
    {
      id: 4,
      name: "Shark",
      age: 12,
    },
  ],
};

function setState(newState) {
  const prevState = { ...state };
  const nextState = { ...state, ...newState };
  state = nextState;

  render();
  onStateChange(prevState, nextState);
}

function onStateChange(prevState, nextState) {
  if (prevState.animals !== nextState.animals) {
    console.log(state.animals)
  }
}

function HomePage() {
  const div = document.createElement("div");

  state.animals.map((data, i) => {
    const list = document.createElement("li");
    list.textContent = data.name;

    list.onclick = function (event) {
      // setState({animals: animals.splice(i, 1)})
      
      // console.log(state.animals);
    };

    div.append(list);
  });

  return div;
}

function render() {
  const root = document.getElementById("root");
  root.append(HomePage());
}

render();
