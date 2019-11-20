
// 二叉搜索树
function node(data){
  const o = {
    data: data,
    left: null,
    right: null
  }
  return o
}
function insertNode(n, data){
  if(n.data > data){
    if(n.left == null){
      n.left = node(data)
    }else{
      insertNode(n.left, data)
    }
  }else{
    if(n.right == null){
      n.right = node(data)
    }else{
      insertNode(n.right, data)
    }
  }
}

let binarySearchTree = {
  data: null,
  ans: [],
  insert: function(data){
    if(!this.data){
      this.data = node(data)
    }else{
      insertNode(this.data ,data)
    }
  },
  output: function(n){
    if(n.left){
      this.output(n.left)
    }
    this.ans.push(n.data)
    if(n.right){
      this.output(n.right)
    }
  }
}

let arr = new Array(1000000).fill(0).map((item, index) => (index + 1)).sort(()=>Math.random()-.5)
let arr2 = [ 7, 3, 8, 4, 4, 2 , 1, 1, 6, 5, 2, 10, 9 ]
arr2.forEach(item => {
  binarySearchTree.insert(item)
})
console.time("BST")

binarySearchTree.output(binarySearchTree.data)
console.timeEnd("BST")
console.log(binarySearchTree)
