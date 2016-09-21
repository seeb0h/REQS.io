'use strict';

// Configuring the Requirements module
angular.module('requirements').run(['Menus',
  function (Menus) {
    // Add the requirements dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Requirements',
      state: 'requirements',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'requirements', {
      title: 'List Requirements',
      state: 'requirements.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'requirements', {
      title: 'Create Requirements',
      state: 'requirements.create',
      roles: ['user']
    });
  }
]);