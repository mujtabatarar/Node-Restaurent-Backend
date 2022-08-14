var reverseOnlyLetters = function(S) {
    let l = 0;
    let r = S.length - 1;
    let arr = S.split('');
    
    while (l < r) {
        if (!isAlpha(arr[l])) l++;
        if (!isAlpha(arr[r])) r--;
        if (isAlpha(arr[l]) && isAlpha(arr[r])) {
            // swap
            [arr[l], arr[r]] = [arr[r], arr[l]];
            l++
            r--;
        }
    }
    console.log( arr.join(''));
};

var isAlpha = (c) => /[a-zA-Z]/.test(c);
reverseOnlyLetters("KSFAJLKD&SJ");
