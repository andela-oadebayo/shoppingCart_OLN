var shoppingCart = { 

  shopItemInput : document.getElementById("itemInput"),
  addButton : document.getElementsByTagName("button")[0],
  unacquiredItemHolder : document.getElementById("recentItems"),
  acquiredItemHolder : document.getElementById("previousItems"),
 
  createNewItemElement : function(newString){
    //create a list item

    var listItem = document.createElement("li");
    //input(checkbox)
    var checkBox = document.createElement("input");
    //label
    var label = document.createElement("label");
    //input(text)
    var input = document.createElement("input");
    input.classList.add("save");
    //button.edit
    var editButton = document.createElement("button");
    //button.delete
    var deleteButton = document.createElement("button");

    //Modfication of the newly created element
    checkBox.type = "checkbox";
    input.type = "text";

    editButton.innerText = "edit";
    editButton.className = "edit";
    deleteButton.innerText = "delete";
    deleteButton.className = "delete";

    label.innerText = newString;

    //Appending each elements to the parent item
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(input);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
  },

  addShopItem : function(self){
    console.log("add new shop item");
    //create a new list item with text from the new task
    // console.log(self);

    var inputs = self.shopItemInput.value;
    if (inputs == undefined || inputs == ""){
      alert("Pls type a valid item");
    }
    else{
      var listItem = self.createNewItemElement(inputs);
      self.unacquiredItemHolder.appendChild(listItem);
      self.bindItemEvents(listItem, self.acquiredShopItem);
      self.shopItemInput.value = "";    
    }
  },

  editShopItem : function(){
  console.log("edit shopping item");

    var listItem = this.parentNode;
    var editBtn = listItem.getElementsByTagName('button')[0];

    var editInput = listItem.querySelector("input[type=text");
    var label = listItem.querySelector("label");
    var containsClass = listItem.classList.contains("editMode");

    //if the  class of the patrent has .editMode
    if(containsClass){
      //swicth from edit .editMode
      //label text become the inputs output
      //change button back to edit
      label.innerText = editInput.value;
      editBtn.innerText = "edit";
    } 
    else {
      //switch to edit mode
      //inputs value becomes the label's text
      //change the edit button to save onclick of edit button
      editInput.value = label.innerText;
      editBtn.innerText = "Save";
    }
    //toogle .editMode on the parent
    listItem.classList.toggle("editMode");
  },

  deleteShopItem : function(){
    console.log("delete an item...");

    //remove the parent list item from the ul
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);
  },

  acquiredShopItem : function(){
    console.log("Item acquired...");
    //Append the task list item to the acquired section
    var listItem = this.parentNode;
    this.acquiredItemHolder.appendChild(listItem); 
    this.bindItemEvents(listItem, this.unacquiredShopItem);
  },

  //Mark an item as unacquired
  unacquiredShopItem : function(){
    console.log("Item not acquired...");
    //Append the task list item to the unacquired section
    var listItem = this.parentNode;
    // unacquiredItemHolder.appendChild(listItem);
    this.bindItemEvents(listItem, this.acquiredShopItem);
  },

  bindItemEvents : function(itemList, checkBoxEventHandler){
    console.log("Bind lits items....");
    //select it's 
    var checkBox = itemList.querySelector("input[type=checkbox]");
    var editButton = itemList.querySelector("button.edit");
    var deleteButton = itemList.querySelector("button.delete");

      //bind editShopItem to edit button
      editButton.onclick = this.editShopItem;

      //bind deleteShopItem to the delete button
      deleteButton.onclick = this.deleteShopItem;

      //bind checkBoxEventHandler to checkbox 
      checkBox.onchange = this.checkBoxEventHandler;
  }
};

var self = shoppingCart;

shoppingCart.addButton.onclick = shoppingCart.addShopItem(self);

//transverse over unacquiredShopItem ul li items
for(var i = 0; i < shoppingCart.unacquiredItemHolder.children.length; i++ ){
  //bind events to list items children(itemAcquired)
  shoppingCart.bindItemEvents(shoppingCart.unacquiredItemHolder.children[i], shoppingCart.acquiredShopItem);
}

