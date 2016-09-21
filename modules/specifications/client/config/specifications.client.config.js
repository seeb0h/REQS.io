'use strict';

// Configuring the Specifications module
angular.module('specifications').run(['Menus',
  function (Menus) {
    // Add the specifications dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Specifications',
      state: 'specifications',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'specifications', {
      title: 'List Specifications',
      state: 'specifications.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'specifications', {
      title: 'Create Specifications',
      state: 'specifications.create',
      roles: ['user']
    });
  }
]);
