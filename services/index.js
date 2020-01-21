class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
}
function prepareObjectForClient(ll) {
  let temp = ll.head;
  let result = [];
  let id = 1;
  while (temp != null) {
    temp.data.id = id;
    id++;
    result.push(temp.data);
    temp = temp.next;
  }

  result = result.map(item => {
    item.next = item.id + 1;
    if (item.id == result.length) {
      item.next = null;
    }
    return item;
  });

  return result;
}

function insertLast(data, ll) {
  let temp = ll.head;
  while (temp.next != null) {
    temp = temp.next;
  }
  temp.next = new Node(data);
  return ll;
}

function deleteLast(ll) {
  let temp = ll.head;
  while (temp && temp.next && temp.next.next != null) {
    temp = temp.next;
  }
  let result = temp.next.data;
  temp.next = null;
  return { result, ll };
}

function getSize(nodetoOperate) {
  let count = 0;
  while (nodetoOperate.head != null) {
    count++;
    nodetoOperate.head = nodetoOperate.head.next;
  }
  return count;
}

module.exports = {
  Node,
  LinkedList,
  prepareObjectForClient,
  insertLast,
  deleteLast,
  getSize
};
