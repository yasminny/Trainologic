const contacts = [
  {
    id: 1,
    name: "Friends",
    type: "Group",
    contacts: [
      {id: 2, name: "Udi", type: "Contact"},
      {id: 3, name: "Tommy", type: "Contact"},
      {
        id: 6,
        name: "Old Friends",
        type: "Group",
        contacts: [
          {id: 7, name: "Itay", type: "Contact"},
        ]
      },
    ]
  },
  {
    id: 4,
    name: "Family",
    type: "Group",
    contacts: [
      {id: 5, name: "Roni", type: "Contact"},
    ]
  },
  {id: 8, name: "Ori", type: "Contact"},
];

const main = document.querySelector('.main');
main.addEventListener('click', () => ifClicked(event));

function buildLayer(list, addTo) {
  let helper = document.createElement('div');
  return list.map((item) => {
    helper.innerHTML += `<li class='layer ${item.type + ' ' + item.id }' layerName="${item.name}">${item.name}</li>`;
    const newLi = addTo.appendChild(helper.querySelector('.layer'));
    newLi.addEventListener('mouseover', (e) => hover(e));
  });
}

function hover(e) {
  e.target.classList.toggle('hover');
  const liElements = main.querySelectorAll('li');
  liElements.forEach((li) => {
    if (li.classList.contains('hover')) {
      return li.classList.toggle('hover');
    }
  });
  if (e.target.classList.contains('layer')) {
    e.target.classList.toggle('hover');
  }
}

function ifClicked(e) {
  const target = e.target;
  const classList = target.className;
  if (target.classList.contains('layer')) {
    const id = classList.match(/\d/);
    if (target.classList.contains('Group') && !target.classList.contains('open')) {
      target.classList.toggle('open');
      target.innerHTML += `<ul class="no-hover"></ul>`;
      const getNewLayerReady = target.querySelector('ul');
      let temp;
      let newLevelObj = contacts.find((obj) => {
        if (obj.id === parseInt(id[0])) {
          temp = obj;
          return temp;
        }
        else {
          if (obj.type === "Group") {
            return obj.contacts.find((innerObj) => {
              if (innerObj.id === parseInt(id[0])) {
                temp = innerObj;
                return temp;
              }
            });
          }
        }
      });
      const rightOne = temp !== undefined ? temp : newLevelObj;
      buildLayer(rightOne.contacts, getNewLayerReady);
    }
    else {
      target.innerHTML = target.getAttribute('layerName');
      target.classList.toggle('open');
    }
  }
}

buildLayer(contacts, main);