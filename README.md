# emails-editor
Test case ui component


как стили подключать?

чем плохо вложенность dom??

##Frontend home assignment
![image](https://drive.google.com/file/d/1YNa3bQLSOugdH2Hd9tOhtRknFV6axirT/view?usp=sharing)
    
Please create a form based on the screenshot above. It includes a header, two buttons and an email editor (a white block with emails). 

To take a look at how this form should exactly work, you can open any board in Miro and press the Share button on the right top corner of the board. The design is different but the mechanics of the input field is the same.

This component (let’s call it `emails-editor`) should be implemented as a separate js script/library, so it can be used anywhere independently. It should not depend on this particular test web application and this particular test case. The screenshot is just an example, `emails-editor` library should allow anyone to use this library anywhere in their own applications.
 
####Example of `emails-editor.js` usage:

```html
<div id="emails-editor"></div>
<script src="emails-editor.js"></script>
<script>
	const container = document.querySelector('#emails-editor');
	EmailsEditor({container, ...options});
	// some code to control emails via library
</script>
```

####Requirements:
* Email block should be created by pressing Enter, comma, or by losing focus on the input field. Any string can be converted to a block. A Block can be deleted.
* Email editor block’s width must depend on the parent container’s width. If parent width changes, emails should be redistributed by rows.
* If there are a lot of emails in the editor, the user should be able to scroll this block.
* Emails, pasted via `ctrl+v/cmd+v` should be split and converted into several blocks. For example, string `“ivan@mail.ru, max@mail.ru”` should be converted into 2 email blocks.
* Invalid emails should be converted into blocks with a red underline.
* By clicking `"Add email"` button a random email should be added to the list.
* By clicking the `"Get emails count"` button a user should see an alert with valid emails count.
* Do NOT implement editing of email via double-click.
* It should be possible to create several emails editors on the same page.
* The library should have no external dependencies like React or Lodash.
* It should be possible to use `emails-editor` library in other applications by other people, not only in this one (just hypothetically, please do not publish it to npm)
* Styles for emails-editor should be distributed via separate file emails-editor.css, or they can be bundled inside emails-editor.js, if you use something like webpack
* Usage of TypeScript, Less, Webpack, etc. is for your consideration

####API requirements:
* method to set emails list
* method to get emails list
* ability to subscribe for changes of emails list

####Design requirements:
* Font: Open sans
* Header size: 20рх
* Buttons color: #4262FF
* The result form must be fully identical as the attached screenshot with design.
PNG image (x2)
* https://drive.google.com/file/d/1YNa3bQLSOugdH2Hd9tOhtRknFV6axirT/view?usp=sharing
* Design in Figma https://www.figma.com/file/CWdAs3rN4d2gZpnoN7ZPvj/Share-test?node-id=0%3A1

####Please make sure that:
* It’s available via a public link
* Its source code is available via git
* git repository contains a README that describes how to use that library. Examples + documentation. 
* Built version (bundle) is in the same repository near the source code.
