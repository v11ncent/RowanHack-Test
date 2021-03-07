//backend

//card = default template json
const card = require('./template.json');


//adds member
function addMember(member) {
    card.members.push(member);
}


//params
function addTodo(card, task) {
    card.column.todo.push(param)
};

//specificColumn = todo/inProgress/Completed...
//I need a better name for it
function addTask(card, bucketName, task) {
    if (bucketName == "todo") { 
        card.buckets[0].cards.push(task); 
        return;
    };

    //if specificColumn != todo
    card.buckets.forEach((e, i) => {
        if (e.name == bucketName) {
            const array = card.buckets[i].cards;
            
        }
    })
    const array = card.buckets.specificColumn;
    const index = array.indexOf(task);

    if (index > -1) {
       array.splice(index, 1);
    }
    card.column.specificColumn.push(task);
};

function removeTask(bucketName, task) {
    const array = card.bucketName.cards;
    //indexOf() is faster than includes() by a marginal amount
    const index = card.bucketName.cards.indexOf(task);
    if (index > -1) {
        array.splice(index, 1);
    }
}