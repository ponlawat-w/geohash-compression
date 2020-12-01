/**
 * Get subtree from specified hash, create new child node if not exists
 * @param {*} subtree
 * @param {string} hash
 * @returns {*} child tree
 */
const getSubtree = (subtree, hash) => {
  if (subtree.T[hash]) {
    return subtree.T[hash];
  }
  subtree.T[hash] = {
    N: 0, C: false, T: {}
  };
  subtree.N++;
  return subtree.T[hash];
};

/**
 * Check completeness of tree (to be called recursively)
 * @param {*} subtree 
 */
const checkCompleteness = subtree => {
  const subLevels = Object.keys(subtree.T).filter(k => subtree.T[k].N > 0);
  if (subtree.N === 32 && !subLevels.length) { // has 32 children without more grandchildren
    subtree.C = true;
    return;
  }
  
  for (let i = 0; i < subLevels.length; i++) {
    checkCompleteness(subtree.T[subLevels[i]]);
  }

  if (subLevels.length && subLevels.reduce((p, k) => p && subtree.T[k].C, true)) { // all children are marked complete
    subtree.C = true;
  }
};

/**
 * Recursive to deeper level, stop and push hash to hashes array when level is most bottom or able to compress
 * @param {string[]} hashes 
 * @param {string} hash 
 * @param {*} subtree 
 */
const compressSubtree = (hashes, hash, subtree) => {
  if (subtree.N === 0 || subtree.C) { // lower level is complete
    hashes.push(hash);
    return;
  }
  const subHashes = Object.keys(subtree.T);
  for (let i = 0; i < subHashes.length; i++) {
    compressSubtree(hashes, subHashes[i], subtree.T[subHashes[i]]);
  }
};

/**
 * Compress tree by merge all upper levels whose children are completely fulfilled by 32 grandchildren
 *  returns array string of geohash with different length
 * @param {*} tree 
 * @returns {string[]} compressed hashes
 */
const compressTree = tree => {
  if (!tree.N) {
    return [];
  }
  const hashes = [];
  compressSubtree(hashes, '', tree);
  return hashes;
};

/**
 * Compress geohashes by group all hashes to upper level if it is fulfilled by lower levels
 * @param {string[]} hashes 
 * @returns {string[]} compressed hashes
 */
module.exports = hashes => {
  // a tree is an object with properties,
  // N: number of children
  // C: mark whether the level is complete (all children are fullfilled with 32 grandchildren, or most-bottom levels)
  // T: object of children nodes having key to be hash, and value to be tree object with same structures with this
  const tree = {N: 0, C: false, T: {}};

  for (let i = 0; i < hashes.length; i++) {
    const hash = hashes[i];
    let subtree = tree;
    let currentHash = '';
    for (let j = 0; j < hash.length; j++) {
      currentHash += hash[j];
      subtree = getSubtree(subtree, currentHash);
    }
  }
  checkCompleteness(tree);

  return compressTree(tree);
};
