//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
var valid = [], invalid = [];
['constant'].forEach(function(syntax){
    valid.push({
        code: 'app.' + syntax + '("constant", function(){});',
        args: [1, 'constant']
    }, {
        code: 'app.' + syntax + '("myConstant", function(){});',
        args: [1, /^my/]
    }, {
        code: 'app.' + syntax + '("constants", function(){});',
        args: [1, undefined]
    }, {
        code: 'app.' + syntax + '("eslintConstant", function(){});',
        args: [1, '/^eslint/']
    });

    invalid.push({
        code: 'app.' + syntax + '("Value", function(){});',
        args: [1, 'eslint'],
        errors: [{ message: 'The Value constant should be prefixed by eslint'}]
    }, {
        code: 'app.' + syntax + '("esLintConstant", function(){});',
        args: [1, 'eslint'],
        errors: [{ message: 'The esLintConstant constant should be prefixed by eslint'}]
    }, {
        code: 'app.' + syntax + '("Provider", function(){});',
        args: [1, /^eslint/],
        errors: [{ message: 'The Provider constant should follow this pattern: /^eslint/'}]
    }, {
        code: 'app.' + syntax + '("Provider", function(){});',
        args: [1, '/^eslint/'],
        errors: [{ message: 'The Provider constant should follow this pattern: /^eslint/'}]
    }, {
        code: 'app.' + syntax + '("$Provider", function(){});',
        args: [1, /^eslint/],
        errors: [{ message: 'The $Provider constant should not start with "$". This is reserved for AngularJS constants'}]
    });
});


var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_constant_name', {
    valid: valid,
    invalid: invalid
});
