Ext.define('OCS.RetailForm', {
	extend: 'Ext.form.Panel',
	border: false,
	region: 'center',
	height: 410,
	autoScroll: true,
	closeAction: 'hide',	
	split: true,
	bodyPadding: '10 10 0',	
	func: 'crm_retail_list',
	fieldDefaults: {
		labelAlign: 'right',
		labelWidth: 70,
		msgTarget: 'qtip'
	},

	constructor: function(cnfg) {
        this.callParent(arguments);
        this.initConfig(cnfg);	
    },
	
	onTextFieldChange: function(v) {
		var me = this;			
		if (v) {
			me.duplicateCheck = true;
			me.query = v;
			views['retail'].store.getProxy().extraParams = {handle: 'web', action: 'select', func: me.func, query: me.query};
			views['retail'].store.loadPage(1, {callback: function() {
				if (me.up().down("#customer_duplicate_warning")) {												
					if (me.duplicateCheck && views['retail'].store.getCount() > 0)						
						me.up().down("#customer_duplicate_warning").setText('Ижил мэдээлэл '+views['retail'].store.getTotalCount()+' ширхэг байна !');
					else
						me.up().down("#customer_duplicate_warning").setText('');
				}
			}});
		} else {
			me.duplicateCheck = false;
			views['retail'].store.getProxy().extraParams = {handle: 'web', action: 'select', func: me.func};
			views['retail'].store.loadPage(1);
		}
	},
	
	convertLatin: function(value, value1) {
		if (typeof value == 'undefined') value = '';
		if (typeof value1 == 'undefined') value1 = '';
		
		value = value.toLowerCase();
		value1 = value1.toLowerCase();
		value = value.trim();
		value1 = value1.trim();

		chrs = [];
		chrs['а'] = 'a';chrs['ж'] = 'j';chrs['ө'] = 'u';chrs['ц'] = 'ts';chrs['ю'] = 'yu';
		chrs['б'] = 'b';chrs['и'] = 'i';chrs['п'] = 'p';chrs['ч'] = 'ch';chrs['я'] = 'ya';
		chrs['в'] = 'v';chrs['й'] = 'i';chrs['р'] = 'r';chrs['ш'] = 'sh';chrs['ф'] = 'f';
		chrs['г'] = 'g';chrs['к'] = 'k';chrs['с'] = 's';chrs['щ'] = 'sch';
		chrs['д'] = 'd';chrs['л'] = 'l';chrs['т'] = 't';chrs['ь'] = 'i';
		chrs['е'] = 'е';chrs['м'] = 'm';chrs['у'] = 'u';chrs['ъ'] = 'i';
		chrs['ё'] = 'yo';chrs['н'] = 'n';chrs['ү'] = 'u';chrs['ы'] = 'i';
		chrs['з'] = 'z';chrs['о'] = 'o';chrs['х'] = 'kh';chrs['э'] = 'e';
		chrs['.'] = '.';chrs['-'] = '-';;chrs[' '] = ' ';
		
		v1 = ''; v2 = '';
		if (value.length > 0)
		{
			for (i = 0; i < value.length; i++) {
				if (chrs[value.charAt(i)])
					v1 = v1 + chrs[value.charAt(i)];
				else
					v1 = v1 + value.charAt(i);
			}
		}

		if (value1.length > 0)
		{		
			for (i = 0; i < value1.length; i++) {
				if (chrs[value1.charAt(i)])
					v2 = v2 + chrs[value1.charAt(i)];
				else
					v2 = v2 + value1.charAt(i);
			}
		}

		return v1.toUpperCase()+' '+v2.toUpperCase(); //this.capitalise(v1)+' '+this.capitalise(v2);
	},

	initComponent: function() {
		var me = this;

		me.items = [{
				xtype: 'fieldset',
				title: 'Main information',
				collapsible: true,
				defaultType: 'textfield',
				layout: 'anchor',
				defaults: {
					anchor: '100%',
					margin: '20 20 20 20',
				},
				items: [{
					xtype: 'fieldcontainer',
					fieldLabel: 'Contact',
					layout: 'hbox',
					combineErrors: true,
					defaultType: 'textfield',
					defaults: {
						hideLabel: 'true'
					},
					items: [{
						name: 'customer_type',
						value: '0',
						hidden: true
					},{
						name: 'type',
						value: 'ХУВЬ ХҮН',
						hidden: true
					},{
						id: 'firstName',
						name: 'firstName',
						fieldLabel: 'First',
						flex: 0.5,
						labelWidth: 70,
						focused: true,
						maskRe : /[а-яөүА-ЯӨҮёЁ]/,
						emptyText: 'Нэр',
						allowBlank: false,
						listeners: {
							keyup: {
								element: 'el',
								fn: function() {
									me.firstName = Ext.getCmp('retail_form').getForm().findField('firstName').getValue();
									me.lastName = Ext.getCmp('retail_form').getForm().findField('lastName').getValue();
									Ext.getCmp('retail_form').getForm().findField("engName").setValue(me.convertLatin(me.firstName, me.lastName));
								//	me.onTextFieldChange(me.firstName, 'firstName');
								},
								scope: this,
								buffer: 100
							},
							afterrender: function(field) {
								field.focus();
							}
						}
					},{
						id: 'lastName',
						name: 'lastName',
						fieldLabel: 'Last',
						flex: 0.5,
						margins: '0 0 0 6',
						maskRe : /[а-яөүА-ЯӨҮёЁ]/,
						emptyText: 'Овог',
						allowBlank: false,
						listeners: {
							keyup: {
								element: 'el',
								fn: function() {
									me.firstName = Ext.getCmp('retail_form').getForm().findField('firstName').getValue();
									me.lastName = Ext.getCmp('retail_form').getForm().findField('lastName').getValue();
									Ext.getCmp('retail_form').getForm().findField("engName").setValue(me.convertLatin(me.firstName, me.lastName));
//									me.onTextFieldChange(me.lastName, 'lastName');
								},
								scope: this,
								buffer: 100
							},
							afterrender: function(field) {
								field.focus();
							}
						}
					},{
						name: 'engName',
						fieldLabel: 'engName',
						flex: 0.5,
						margins: '0 0 0 6',
						emptyText: 'Latin'
					}]
				},{
					xtype: 'container',
					layout: 'hbox',
					defaultType: 'textfield',
					items: [{
						name: 'birthday',
						fieldLabel: 'Birth date',
						labelWidth: 70,
						flex: 0.5,
						hideLabel: false,
						value: '1970-01-01',
						format: 'Y-m-d',
						xtype: 'datefield'
					},{
						name: 'gender',
						flex: 0.3,
						fieldLabel: 'Gender',
						labelWidth: 40,
						margins: '0 0 0 6',
						xtype: 'combo',
						store: Ext.create('Ext.data.Store', {
						  model: 'CRM_ITEM',
						  data: [{value: 'эр'},{value: 'эм'}]
						}),
						queryMode: 'local',
						displayField: 'value',
						value: 'эр',
						valueField: 'value',
						triggerAction: 'all',
						editable: false
					},{
						id: 'regNo',
						name: 'regNo',
						fieldLabel: 'Register №',
						hideLabel: false,
						labelWidth: 70,
						flex:0.5,
						margins: '0 0 0 6',
						emptyText: '',
						maxLength: 10,
						maskRe : /[0-9А-ЯӨҮа-яөү]/,
						listeners: {
							keyup: {
								element: 'el',
								fn: function() {
//									me.onTextFieldChange(Ext.getCmp('retail_form').getForm().findField('regNo').getValue(), 'regNo');
								},
								scope: this,
								buffer: 100
							}
						}
					}]
				}, {
					xtype: 'container',
					layout: 'hbox',
					defaultType: 'textfield',
					items: [{
						fieldLabel: 'Level',
						xtype: 'combo',
						value: 'suspect',
						labelWidth: 70,
						name: 'level',
						store: Ext.create('Ext.data.Store', {
						  model: 'CRM_ITEM',
						  data: [{value: 'customer'},{value: 'prospect'},{value: 'suspect'}]
						}),
						queryMode: 'local',
						displayField: 'value',
						valueField: 'value',
						triggerAction: 'all',
						editable: false,
						flex: 0.5
					},{
						fieldLabel: 'Type',
						xtype: 'combo',
						name: '_class',
						margins: '0 0 0 6',
						value: 'RETAIL',
						store: Ext.create('Ext.data.Store', {
						  model: 'CRM_ITEM',
						  data: [{value: 'RETAIL'},{value: 'VIP'},{value: 'EXPAT'}]
						}),
						queryMode: 'local',
						displayField: 'value',
						valueField: 'value',
						triggerAction: 'all',
						editable: false,
						flex: 0.5
					},{
						name: 'source',
						fieldLabel: 'Source',
						xtype: 'combo',
						value: 'employee referral',
						store: Ext.create('Ext.data.Store', {
						  model: 'CRM_ITEM',
						  data: [{value: 'partner'},{value: 'employee referral'},{value: 'external referral'},{value: 'public relations'},{value: 'party'},{value: 'advertisement'},{value: 'cold call'},{value: 'web research'}]
						}),							  
						queryMode: 'local',
						displayField: 'value',
						valueField: 'value',
						triggerAction: 'all',
						editable: false,
						flex: 0.5
					}]
				},{
					xtype: 'container',
					layout: 'hbox',
					defaultType: 'textfield',
					items: [{
						fieldLabel: 'Social status',
						xtype: 'combo',
						labelWidth: 70,
						value: 'ажилладаг',
						name: 'work_status',
						store: Ext.create('Ext.data.Store', {
						  model: 'CRM_ITEM',
						  data: [{value: 'ажилладаг'},{value: 'сурдаг'},{value: 'тэтгэвэрт'},{value:'бусад'}]
						}),
						queryMode: 'local',
						displayField: 'value',
						valueField: 'value',
						triggerAction: 'all',
						editable: false,
						flex: 0.5
					},{
						fieldLabel: 'Company',
						labelWidth: 80,
						xtype: 'searchcombo',
						name: 'title',
						table: 'crm_customer',
						margins: '0 0 0 6',
						flex: 0.75
					}, {
						emptyText: 'Position',
						xtype: 'searchcombo',
						table: 'crm_customer',
						name: 'job_title',
						margins: '0 0 0 6',
						flex: 0.5
					}, {
						emptyText: 'Мэргэжил',
						xtype: 'searchcombo',
						table: 'crm_customer',
						margins: '0 0 0 6',
						hidden: true,
						name: 'job_type',
						flex: 0.5
					}]
				}]
			},{
				xtype: 'fieldset',
				title: 'Contact information',
				defaultType: 'textfield',
				layout: 'anchor',
				collapsible: true,
				defaults: {
					anchor: '100%',
					margin: '20 20 20 20'
				},
				items: [{
						xtype: 'container',
						layout: 'hbox',
						defaultType: 'textfield',
						items: [{
							id: 'phone1',
							fieldLabel: 'Phone 1',
							labelWidth: 70,
							name: 'phone',
							flex: 0.5,
							emptyText: 'xxxxxxxx',
							maxLength: 12,
							maskRe: /[\d\-]/,
							regex: /^\d{8}$/,
							allowBlank: false,
							regexText: 'Must be in the format xxx-xxx-xxxx',
							listeners: {
								keyup: {
									element: 'el',
									fn: function(e) {
//										me.onTextFieldChange(Ext.getCmp('retail_form').getForm().findField('phone1').getValue(), 'phone');
									},
									scope: this,
									buffer: 100
								}
							}
						}, {
							fieldLabel: 'Phone 2',
							labelWidth: 60,
							name: 'phone1',
							flex: 0.5,
							emptyText: 'xxxxxxxx',
							maskRe: /[\d\-]/,
							regex: /^\d{8}$/,
							maxLength: 8,
							regexText: 'Must be in the format xxx-xxx-xxxx'
						}, {
							fieldLabel: 'Fax',
							labelWidth: 40,
							name: 'fax',
							flex: 0.5,
							emptyText: 'xxxxxxxx',
							maskRe: /[\d\-]/,
							regex: /^\d{8}$/,
							maxLength: 8,
							regexText: 'Must be in the format xxx-xxx-xxxx'
						}]
					},{
						xtype: 'container',
						layout: 'hbox',
						defaultType: 'textfield',
						items: [{
							fieldLabel: 'Email',
							labelWidth: 70,
							name: 'email',
							vtype: 'email',
							maxLength: 32,
							flex: 1
						}, {
							fieldLabel: 'Social link',
							name: 'www',
//							vtype: 'url',
							labelWidth: 70,
							maxLength: 128,
							flex: 1
						},{
							xtype: 'textfield',
							fieldLabel: 'Post code',
							labelWidth: 60,
							name: 'postalCode',
							width: 150,
							maxLength: 10,
							regexText: 'Must be in the format xxxxx or xxxxx-xxxx'
						}]
					},{
						xtype: 'container',
						layout: 'hbox',								
						items: [{
							xtype: 'searchcombo',
							name: 'country',							
							fieldLabel: 'Country',
							value: 'Монгол',
							table: 'crm_customer',
							labelWidth: 70,
							flex: 1
						}, {
							xtype: 'searchcombo',
							name: 'city',							
							fieldLabel: 'City',
							value: 'Улаанбаатар',
							table: 'crm_customer',
							labelWidth: 50,
							flex: 1
						},{
							xtype: 'searchcombo',
							name: 'district',							
							fieldLabel: 'District',
							table: 'crm_customer',
							labelWidth: 50,
							flex: 1
						}]
					},{
						xtype: 'container',
						layout: 'hbox',
						defaultType: 'textfield',
						items: [{
							labelWidth: 70,
							xtype: 'searchcombo',
							fieldLabel: 'Khoroo',
							table: 'crm_customer',
							name: 'horoo',
							flex: 0.5
						},{
							labelWidth: 50,
							fieldLabel: 'Хаяг',
							name: 'address',
							flex: 1
						}]
					}
				]
			},{
				xtype: 'fieldset',
				title: 'Note',
				collapsible: true,
				collapsed: false,
				defaultType: 'textfield',
				layout: 'anchor',
				defaults: {
					anchor: '100%'
				},
				items: [{
					xtype: 'textarea',
					fieldLabel: 'Note',
					emptyText: 'Note...',
					labelWidth: 70,
					name: 'descr',
					flex: 1
				},{
					hidden: true,
					name: 'userCode',
					value: logged
				}]					
			}
		];

		me.buttons = [{
			itemId: 'customer_duplicate_warning',
			xtype: 'tbtext',
			text: '',
			cls: 'warning'
		},{
			itemId: 'commit_after_close',
			xtype: 'checkbox',
			labelWidth: 140,
			boxLabel: 'automatically close window after commit'
		},'->',{
			text : 'Reset',
			iconCls: 'reset',
			handler: function() {
				var form = this.up('form').getForm();
				form.reset();
			}
		},{
			iconCls: 'commit',
			text: 'Commit',
			handler: function() {
				var form = this.up('form').getForm();
				if (form.isValid())	{
					var values = form.getValues(true);	
					me.ep = views['retail'].store.getProxy().extraParams;
					views['retail'].store.getProxy().extraParams = {handle: 'web', action: 'insert', func: 'crm_retail_list', table: 'crm_customer', values:values};
					views['retail'].store.load(function(data) {
						views['retail'].store.getProxy().extraParams = me.ep;
						views['retail'].store.loadPage(1);
						form.reset();
					});
				}
			}
		}];

		me.callParent(arguments);
	}
});


Ext.define('OCS.CorporateForm', {
	extend: 'Ext.form.Panel',
	border: false,
	region: 'cebter',
	height: 410,
	autoScroll: true,
	split: true,
	func: 'crm_corporate_list',
	bodyPadding: '10 10 10 10',	
	fieldDefaults: {
		labelAlign: 'right',
		labelWidth: 60,
		msgTarget: 'qtip'
	},

	constructor: function(cnfg) {
        this.callParent(arguments);
        this.initConfig(cnfg);	
    },
		
	onTextFieldChange: function(v) {
		var me = this;			
		if (v && 1==0) {
			me.duplicateCheck = true;
			me.query = v;
			views['corporate'].store.getProxy().extraParams = {handle: 'web', action: 'select', func: me.func, query: me.query};
			views['corporate'].store.loadPage(1, {callback: function() {
				if (me.up().down("#customer_duplicate_warning")) {												
					if (me.duplicateCheck && views['corporate'].store.getCount() > 0)						
						me.up().down("#customer_duplicate_warning").setText('Ижил мэдээлэл '+views['corporate'].store.getTotalCount()+' ширхэг байна !');
					else
						me.up().down("#customer_duplicate_warning").setText('');
				}
			}});
		} else {
			me.duplicateCheck = false;
			views['corporate'].store.getProxy().extraParams = {handle: 'web', action: 'select', func: me.func};
			views['corporate'].store.loadPage(1);
		}
	},

	convertLatin: function(value) {
		value = value.toLowerCase();

		chrs = [];
		chrs['а'] = 'a';chrs['ж'] = 'j';chrs['ө'] = 'u';chrs['ц'] = 'ts';chrs['ю'] = 'yu';
		chrs['б'] = 'b';chrs['и'] = 'i';chrs['п'] = 'p';chrs['ч'] = 'ch';chrs['я'] = 'ya';
		chrs['в'] = 'v';chrs['й'] = 'i';chrs['р'] = 'r';chrs['ш'] = 'sh';chrs['ф'] = 'f';
		chrs['г'] = 'g';chrs['к'] = 'k';chrs['с'] = 's';chrs['щ'] = 'sch';
		chrs['д'] = 'd';chrs['л'] = 'l';chrs['т'] = 't';chrs['ь'] = 'i';
		chrs['е'] = 'е';chrs['м'] = 'm';chrs['у'] = 'u';chrs['ъ'] = 'i';
		chrs['ё'] = 'yo';chrs['н'] = 'n';chrs['ү'] = 'u';chrs['ы'] = 'i';
		chrs['з'] = 'z';chrs['о'] = 'o';chrs['х'] = 'kh';chrs['э'] = 'e';
		chrs['.'] = '.';chrs['-'] = '-'; chrs[' '] = ' ';
		
		v1 = '';
		for (i = 0; i < value.length; i++) {
			if (chrs[value.charAt(i)])						
				v1 = v1 + chrs[value.charAt(i)];
			else
				v1 = v1 + value.charAt(i);
		}

		return v1.toUpperCase(); //this.capitalise(v1)+' '+this.capitalise(v2);
	},


	initComponent: function() {
		var me = this;

		me.items = [{
				xtype: 'fieldset',
				title: 'Main information',
				collapsible: true,
				defaultType: 'textfield',
				layout: 'anchor',
				defaults: {
					anchor: '100%',
					margin: '20 20 20 20',
					labelWidth: 60
				},
				items: [{
					xtype: 'container',
					layout: 'hbox',
					combineErrors: true,
					defaultType: 'textfield',
					defaults: {
						hideLabel: true
					},
					items: [{
						id: 'firstName',
						name: 'firstName',
						fieldLabel: 'Name',
						hideLabel: false,
						flex: 0.5,
						maskRe : /[а-яөүА-ЯӨҮёЁ0-9 ]/,
						focused: true,
						emptyText: 'Нэр',
						allowBlank: false,
						listeners: {
							keyup: {
								element: 'el',
								fn: function() {
									me.firstName = Ext.getCmp('corporate_form').getForm().findField('firstName').getValue();
									Ext.getCmp('corporate_form').getForm().findField("engName").setValue(me.convertLatin(me.firstName));
//									me.onTextFieldChange(me.firstName, 'firstName');
								},
								scope: this,
								buffer: 100
							},
							afterrender: function(field) {
								field.focus();
							}
						}
					},{
						name: 'lastName',
						fieldLabel: 'Group',
						flex: 0.4,
						maskRe : /[а-яөүА-ЯӨҮёЁ0-9 ]/,
						margins: '0 0 0 6',
						emptyText: 'Групп нэр'
					},{
						name: 'customer_type',
						value: '1',
						hidden: true
					},{
						name: 'type',
						value: 'БАЙГУУЛЛАГА',
						hidden: true
					},{
						name: 'engName',
						fieldLabel: 'engName',
						flex: 0.4,
						margins: '0 0 0 6',
						emptyText: 'Latin'
					},{
						name: 'company_torol',
						width: 60,
						emptyText: 'Company type',
						margins: '0 0 0 6',
						xtype: 'combo',
						value: 'ХХК',
						store: Ext.create('Ext.data.Store', {
						  model: 'CRM_ITEM',
						  data: [{value: 'ХХК'},{value: 'ХК'},{value: 'ТӨХК'},{value: 'ТББ'},{value: 'ББСБ'},{value: 'ТӨҮГ'},{value: 'ОНӨҮГ'},{value: 'ХЗХ'}]
						}),
						queryMode: 'local',
						displayField: 'value',
						valueField: 'value',
						triggerAction: 'all',
						editable: false
					}]
				}, {
					xtype: 'container',
					layout: 'hbox',
					defaultType: 'textfield',
					items: [{
						fieldLabel: 'Type',
						xtype: 'combo',
						name: '_class',
						value: 'CORPORATE',
						store: Ext.create('Ext.data.Store', {
						  model: 'CRM_ITEM',
						  data: [{value: 'CORPORATE'},{value: 'SME'},{value: 'RESELLER'}]
						}),
						queryMode: 'local',
						displayField: 'value',
						valueField: 'value',
						triggerAction: 'all',
						editable: false,
						flex: 0.5
					},{
						fieldLabel: 'Level',
						xtype: 'combo',
						value: 'suspect',
						name: 'level',
						store: Ext.create('Ext.data.Store', {
						  model: 'CRM_ITEM',
						  data: [{value: 'customer'},{value: 'prospect'},{value: 'suspect'}]
						}),
						queryMode: 'local',
						displayField: 'value',
						valueField: 'value',
						triggerAction: 'all',
						editable: false,
						flex: 0.5
					},{
						id: 'regNo',
						name: 'regNo',
						fieldLabel: 'Register №',
						hideLabel: false,
						width: 220,
						labelWidth: 70,
						margins: '0 0 0 6',
						emptyText: '',
						maxLength: 10,
						maskRe : /[0-9]/,
						listeners: {
							keyup: {
								element: 'el',
								fn: function() {
//									me.onTextFieldChange(Ext.getCmp('regNo').getValue(), 'regNo');
								},
								scope: this,
								buffer: 100
							}
						}
					}]
				}, {
					xtype: 'container',
					layout: 'hbox',
					defaultType: 'textfield',
					items: [{
						name: 'industry',
						flex: 0.5,
						fieldLabel: 'Industry',
						xtype: 'combo',
						store: Ext.create('Ext.data.Store', {
						  model: 'CRM_ITEM',
						  data: [{value: 'Уул уурхай'},{value: 'Барилга'},{value: 'Банк, санхүү'},{value: 'Үйлдвэрлэл'},{value: 'Худалдаа, үйлчилгээ'},{value: 'Тээвэр'},{value: 'Зам, гүүр'},{value: 'Шугам сүлжээ'},{value: 'Аялал жуулчлал'},{value: 'Худалдаа'}]							   
						}),							 
						queryMode: 'local',
						displayField: 'value',
						valueField: 'value',
						triggerAction: 'all',
						editable: false
					},{
						flex: 0.7,
						margins: '0 0 0 6',
						xtype: 'searchcombo',
						name: 'industry_sub',							
						emptyText: 'Organization',
						table: 'crm_corporate_types'
					},{
						emptyText: 'Employees',
						xtype: 'combo',
						name: 'employees',
						margins: '0 0 0 6',
						store: Ext.create('Ext.data.Store', {
						  model: 'CRM_ITEM',
						  data: [{value: 'тодорхойгүй'},{value: '10 доош'},{value: '10-50'},{value: '50-100'},{value:'100-500'},{value:'500-1000'},{value:'1000-с дээш'}]
						}),
						queryMode: 'local',
						displayField: 'value',
						valueField: 'id',
						triggerAction: 'all',
						editable: false,
						flex: 0.3
					}]
				},{
					xtype: 'container',
					layout: 'hbox',
					defaultType: 'textfield',
					items: [{
						fieldLabel: 'Capital',
						xtype: 'currencyfield',
						name: 'capital',
						value: 0,
						flex: 0.5
					},{
						fieldLabel: 'Revenue',
						xtype: 'currencyfield',
						name: 'annual_revenue',
						margins: '0 0 0 6',
						value: 0,
						flex: 0.5
					},{
						fieldLabel: 'Tax',
						xtype: 'currencyfield',
						name: 'tatvar',
						margins: '0 0 0 6',
						labelWidth: 50,
						value: 0,
						flex: 0.5
					}]
				}]
			},{
				xtype: 'fieldset',
				title: 'Contact information',
				defaultType: 'textfield',
				layout: 'anchor',
				collapsible: true,
				defaults: {
					anchor: '100%',
					margin: '20 20 20 20',
					labelWidth: 60
				},
				items: [{
							xtype: 'container',
							layout: 'hbox',
							defaultType: 'textfield',
							items: [{
								id: 'phone1',
								fieldLabel: 'Phone 1',
								labelWidth: 60,
								name: 'phone',
								flex: 0.5,
								emptyText: 'xxxxxxxx',
								maxLength: 8,
								maskRe: /[\d\-]/,
								regex: /^\d{8}$/,
								allowBlank: false,
								regexText: 'Must be in the format xxx-xxx-xxxx',
								listeners: {
									keyup: {
										element: 'el',
										fn: function(e) {
//											me.onTextFieldChange(Ext.getCmp('phone1').getValue(), 'phone');
										},
										scope: this,
										buffer: 100
									}
								}
							}, {
								fieldLabel: 'Phone 2',
								labelWidth: 60,
								name: 'phone1',
								flex: 0.5,
								emptyText: 'xxxxxxxx',
								maskRe: /[\d\-]/,
								regex: /^\d{8}$/,
								maxLength: 8,
								regexText: 'Must be in the format xxx-xxx-xxxx'
							}, {
								fieldLabel: 'Fax',
								labelWidth: 40,
								name: 'fax',
								flex: 0.5,
								emptyText: 'xxxxxxxx',
								maskRe: /[\d\-]/,
								regex: /^\d{8}$/,
								maxLength: 8,
								regexText: 'Must be in the format xxx-xxx-xxxx'
							}]
						},{
							xtype: 'container',
							layout: 'hbox',
							defaultType: 'textfield',
							items: [{
								fieldLabel: 'Email',
								name: 'email',
								vtype: 'email',
								maxLength: 32,
								flex: 0.5
							}, {
								fieldLabel: 'Web',
								name: 'www',
//								vtype: 'url',
								labelWidth: 50,
								maxLength: 128,
								flex: 0.5
							},{
								xtype: 'textfield',
								fieldLabel: 'Post code',
								labelWidth: 60,
								name: 'postalCode',
								width: 150,
								maxLength: 10,
								regexText: 'Must be in the format xxxxx or xxxxx-xxxx'
							}]
						},{
							xtype: 'container',
							layout: 'hbox',								
							items: [{
								xtype: 'searchcombo',
								name: 'country',							
								fieldLabel: 'Country',
								value: 'Монгол',
								table: 'crm_customer',
								flex: 1
							}, {
								xtype: 'searchcombo',
								name: 'city',							
								fieldLabel: 'City',
								table: 'crm_customer',
								value: 'Улаанбаатар',
								labelWidth: 50,
								flex: 1
							},{
								xtype: 'searchcombo',
								name: 'district',							
								fieldLabel: 'District',
								table: 'crm_customer',
								labelWidth: 50,
								flex: 1
							}]
						},{
							xtype: 'container',
							layout: 'hbox',
							defaultType: 'textfield',
							items: [{
								xtype: 'searchcombo',
								fieldLabel: 'Khoroo',
								table: 'crm_customer',
								name: 'horoo',
								flex: 0.5
							},{
								labelWidth: 50,
								fieldLabel: 'Address',
								name: 'address',
								flex: 1
							},{
								hidden: true,
								name: 'userCode',
								value: logged
							},{
								hidden: true,
								name: 'owner',
								value: logged
							}]
						}
				]
			},{
				xtype: 'fieldset',
				title: 'Note',
				collapsible: true,
				collapsed: false,
				defaultType: 'textfield',
				layout: 'anchor',
				defaults: {
					anchor: '100%'
				},
				items: [{
					xtype: 'textarea',
					fieldLabel: 'Note',
					emptyText: 'Note...',
					labelWidth: 70,
					name: 'descr',
					flex: 1
				}]					
			}
		];

		me.buttons = [{
			itemId: 'customer_duplicate_warning',
			xtype: 'tbtext',
			text: '',
			cls: 'warning'
		},'->',{
			text : 'Reset',
			iconCls: 'reset',
			handler: function() {
				var form = this.up('form').getForm();
				form.reset();
			}
		},{
			text: 'Commit',
			iconCls: 'commit',
			handler: function() {
				var form = this.up('form').getForm();
				if (form.isValid())	{
					var values = form.getValues(true);	
					me.ep = views['corporate'].store.getProxy().extraParams;
					views['corporate'].store.getProxy().extraParams = {handle: 'web', action: 'insert', func: 'crm_corporate_list', table: 'crm_customer', values:values};
					views['corporate'].store.load(function(data) {
						views['corporate'].store.getProxy().extraParams = me.ep;
						views['corporate'].store.loadPage(1);
						form.reset();
					});
				}
			}
		}];

		me.callParent(arguments);
	}
});

Ext.define('OCS.ContactForm', {
	extend: 'Ext.form.Panel',
	border: false,
	region: 'center',
	height: 410,
	autoScroll: true,
	closeAction: 'hide',	
	split: true,
	bodyPadding: '10 10 0',	
	fieldDefaults: {
		labelAlign: 'right',
		labelWidth: 70,
		msgTarget: 'qtip'
	},

	constructor: function(cnfg) {
        this.callParent(arguments);
        this.initConfig(cnfg);	
    },		
	
	onTextFieldChange: function(v) {
		var me = this;			
		if (v && 1==0) {
			me.duplicateCheck = true;
			me.query = v;
			views['retail'].store.getProxy().extraParams = {handle: 'web', action: 'select', func: me.func, query: me.query};
			views['retail'].store.loadPage(1, {callback: function() {
				if (me.up().down("#customer_duplicate_warning")) {												
					if (me.duplicateCheck && views['retail'].store.getCount() > 0)						
						me.up().down("#customer_duplicate_warning").setText('Ижил мэдээлэл '+views['retail'].store.getTotalCount()+' ширхэг байна !');
					else
						me.up().down("#customer_duplicate_warning").setText('');
				}
			}});
		} else {
			me.duplicateCheck = false;
			views['retail'].store.getProxy().extraParams = {handle: 'web', action: 'select', func: me.func};
			views['retail'].store.loadPage(1);
		}
	},

	
	convertLatin: function(value, value1) {
		if (typeof value == 'undefined') value = '';
		if (typeof value1 == 'undefined') value1 = '';
		
		value = value.toLowerCase();
		value1 = value1.toLowerCase();
		value = value.trim();
		value1 = value1.trim();

		chrs = [];
		chrs['а'] = 'a';chrs['ж'] = 'j';chrs['ө'] = 'u';chrs['ц'] = 'ts';chrs['ю'] = 'yu';
		chrs['б'] = 'b';chrs['и'] = 'i';chrs['п'] = 'p';chrs['ч'] = 'ch';chrs['я'] = 'ya';
		chrs['в'] = 'v';chrs['й'] = 'i';chrs['р'] = 'r';chrs['ш'] = 'sh';chrs['ф'] = 'f';
		chrs['г'] = 'g';chrs['к'] = 'k';chrs['с'] = 's';chrs['щ'] = 'sch';
		chrs['д'] = 'd';chrs['л'] = 'l';chrs['т'] = 't';chrs['ь'] = 'i';
		chrs['е'] = 'е';chrs['м'] = 'm';chrs['у'] = 'u';chrs['ъ'] = 'i';
		chrs['ё'] = 'yo';chrs['н'] = 'n';chrs['ү'] = 'u';chrs['ы'] = 'i';
		chrs['з'] = 'z';chrs['о'] = 'o';chrs['х'] = 'kh';chrs['э'] = 'e';
		chrs['.'] = '.';chrs['-'] = '-';;chrs[' '] = ' ';
		
		v1 = ''; v2 = '';
		if (value.length > 0)
		{
			for (i = 0; i < value.length; i++) {
				if (chrs[value.charAt(i)])
					v1 = v1 + chrs[value.charAt(i)];
				else
					v1 = v1 + value.charAt(i);
			}
		}

		if (value1.length > 0)
		{		
			for (i = 0; i < value1.length; i++) {
				if (chrs[value1.charAt(i)])
					v2 = v2 + chrs[value1.charAt(i)];
				else
					v2 = v2 + value1.charAt(i);
			}
		}

		return v1.toUpperCase()+' '+v2.toUpperCase(); //this.capitalise(v1)+' '+this.capitalise(v2);
	},


	initComponent: function() {
		var me = this;
		var name = me.record.get('firstName');
		var companyName = name;
		if (name.indexOf('<g>') != -1) {
			companyName = name.substring(name.indexOf('<g>')+3, name.indexOf('</g'));			
			companyName = companyName.trim();
		}

		if (me.record && me.record.get('customer_type') == 1) {
			me.parent_crm_id = me.record.get('crm_id');
			me.crm_id = 0;
		}
		else
			me.crm_id = me.record.get('crm_id');

		me.items = [{
				xtype: 'fieldset',
				title: 'Main information',
				collapsible: true,
				defaultType: 'textfield',
				layout: 'anchor',
				defaults: {
					anchor: '100%',
					margin: '20 20 20 20'
				},
				items: [{
					xtype: 'fieldcontainer',
					fieldLabel: 'Contact',
					layout: 'hbox',
					combineErrors: true,
					defaultType: 'textfield',
					defaults: {
						hideLabel: 'true'
					},
					items: [{
						id: 'firstName',
						name: 'firstName',
						fieldLabel: 'Нэр',
						flex: 0.5,
						value: '',
						focused: true,
						maskRe : /[а-яөүА-ЯӨҮёЁ]/,
						emptyText: 'Нэр',
						allowBlank: false,
						listeners: {
							keyup: {
								element: 'el',
								fn: function() {
									me.firstName = Ext.getCmp('contact_form').getForm().findField('firstName').getValue();
									me.lastName = Ext.getCmp('contact_form').getForm().findField('lastName').getValue();
									Ext.getCmp('contact_form').getForm().findField("engName").setValue(me.convertLatin(me.firstName, me.lastName));
								},
								scope: this,
								buffer: 100
							},
							afterrender: function(field) {
								field.focus();
							}
						}
					},{
						id: 'lastName',
						name: 'lastName',
						fieldLabel: 'Нэр',
						flex: 0.5,
						value: '',
						margins: '0 0 0 6',
						maskRe : /[а-яөүА-ЯӨҮёЁ]/,
						emptyText: 'Овог',
						allowBlank: true,
						listeners: {
							keyup: {
								element: 'el',
								fn: function() {
									me.firstName = Ext.getCmp('contact_form').getForm().findField('firstName').getValue();
									me.lastName = Ext.getCmp('contact_form').getForm().findField('lastName').getValue();
									Ext.getCmp('contact_form').getForm().findField("engName").setValue(me.convertLatin(me.firstName, me.lastName));									
								},
								scope: this,
								buffer: 100
							},
							afterrender: function(field) {
								field.focus();
							}
						}
					},{
						name: 'engName',
						fieldLabel: 'engName',
						flex: 0.5,
						margins: '0 0 0 6',
						emptyText: 'Latin'
					},{
						name: 'gender',
						width: 60,
						emptyText: 'Gender',
						margins: '0 0 0 6',
						xtype: 'combo',
						store: Ext.create('Ext.data.Store', {
						  model: 'CRM_ITEM',
						  data: [{value: 'эр'},{value: 'эм'}]
						}),
						queryMode: 'local',
						displayField: 'value',
						value: 'эр',
						valueField: 'value',
						triggerAction: 'all',
						editable: false
					}]
				}, {
					xtype: 'container',
					layout: 'hbox',
					defaultType: 'textfield',
					items: [{
						fieldLabel: 'Email',
						name: 'email',
						vtype: 'email',
						maxLength: 32,
						flex: 0.5
					}, {
						id: 'phone',
						fieldLabel: 'Phone 1',
						labelWidth: 60,
						name: 'phone',
						width: 160,
						emptyText: 'xxxxxxxx',
						maxLength: 8,
						maskRe: /[\d\-]/,
						regex: /^\d{8}$/,
						allowBlank: false,
						regexText: 'Must be in the format xxx-xxx-xxxx',
						listeners: {
							keyup: {
								element: 'el',
								fn: function(e) {
//									me.onTextFieldChange(Ext.getCmp('contact_form').getForm().findField('phone1').getValue(), 'phone');
								},
								scope: this,
								buffer: 100
							}
						}
					},{
						name: 'source',
						labelWidth: 50,
						flex: 0.5,
						fieldLabel: 'Source',
						margins: '0 0 0 6',
						xtype: 'combo',
						value: 'employee referral',
						store: Ext.create('Ext.data.Store', {
						  model: 'CRM_ITEM',
						  data: [{value: 'partner'},{value: 'employee referral'},{value: 'external referral'},{value: 'public relations'},{value: 'party'},{value: 'advertisement'},{value: 'cold call'},{value: 'web research'}]
						}),							  
						queryMode: 'local',
						displayField: 'value',
						valueField: 'value',
						triggerAction: 'all',
						editable: false
					}]
				}, {
					xtype: 'container',
					layout: 'hbox',
					defaultType: 'textfield',
					items: [{
						fieldLabel: 'Level',
						xtype: 'combo',
						value: 'suspect',
						name: 'level',
						store: Ext.create('Ext.data.Store', {
						  model: 'CRM_ITEM',
						  data: [{value: 'customer'},{value: 'prospect'},{value: 'suspect'}]
						}),
						queryMode: 'local',
						displayField: 'value',
						valueField: 'value',
						hidden: true,
						triggerAction: 'all',
						editable: false,
						flex: 0.5
					},{
						fieldLabel: 'Rank',
						xtype: 'combo',
						allowBlank: false,
						name: 'decision_maker',
						store: Ext.create('Ext.data.Store', {
						  model: 'CRM_ITEM',
						  data: [{value: 'manager'}, {value: 'decision maker'}]
						}),
						queryMode: 'local',
						displayField: 'value',
						valueField: 'value',
						triggerAction: 'all',
						editable: false,
						flex: 0.6
					},{
						fieldLabel: 'Social status',
						xtype: 'combo',
						value: 'ажилладаг',
						name: 'work_status',
						store: Ext.create('Ext.data.Store', {
						  model: 'CRM_ITEM',
						  data: [{value: 'ажилладаг'},{value: 'сурдаг'},{value: 'тэтгэвэрт'},{value:'бусад'}]
						}),
						queryMode: 'local',
						displayField: 'value',
						valueField: 'value',
						triggerAction: 'all',
						hidden: true,
						editable: false,
						flex: 0.5
					},{
						xtype: 'searchcombo',
						name: 'title',
						margins: '0 0 0 6',
						readOnly: true,
						value: companyName,
						flex: 0.75
					},{
						name: 'crm_id',
						margins: '0 0 0 6',
						readOnly: true,
						hidden: true,
						width: 40,
						value: me.crm_id
					},{
						name: 'parent_crm_id',
						margins: '0 0 0 6',
						readOnly: true,
						hidden: true,
						width: 40,
						value: me.parent_crm_id
					},{
						emptyText: 'Position',
						xtype: 'searchcombo',
						table: 'crm_customer',
						name: 'job_title',
						margins: '0 0 0 6',
						flex: 0.5
					}]
				}]
			}
		];

		me.buttons = [{
			itemId: 'customer_duplicate_warning',
			xtype: 'tbtext',
			text: 'Contact-аас хайж олоод оруулж болно !',
			cls: 'warning'
		},'->',{
			text : 'Reset',
			iconCls: 'reset',
			handler: function() {
				var form = this.up('form').getForm();
				form.reset();
			}
		},{
			text: 'Commit',
			iconCls: 'commit',
			handler: function() {
				var form = this.up('form').getForm();
				if (form.isValid())	{
					var values = form.getValues(true);	
					if (form.findField('crm_id').getValue() > 0) {					
						Ext.Ajax.request({
						   url: 'avia.php',
						   params: {handle: 'web', action: 'update', table: 'crm_customer', func: '', values: "decision_maker='"+me.form.findField('decision_maker').getValue()+"',parent_crm_id="+me.parent_crm_id, fields: '', where: 'crm_id='+form.findField('crm_id').getValue()},
						   success: function(response, opts) {
								Ext.MessageBox.alert('Status', 'Success !', function() {});
								form.reset();
						   },
						   failure: function(response, opts) {										   
							  Ext.MessageBox.alert('Status', 'Error !', function() {});
						   }
						});
					} else {
						Ext.Ajax.request({
						   url: 'avia.php',
						   params: {handle: 'web', action: 'insert', table: 'crm_customer', func: '', values: values, fields: '', where: ''},
						   success: function(response, opts) {
								Ext.MessageBox.alert('Status', 'Success !', function() {});
								form.reset();
						   },
						   failure: function(response, opts) {										   
							  Ext.MessageBox.alert('Status', 'Error !', function() {});
						   }
						});
					}
				}
			}
		}];

		me.callParent(arguments);
	}
});



Ext.define('OCS.CompotetorForm', {
	extend: 'Ext.form.Panel',
	border: false,
	region: 'center',
	height: 410,
	autoScroll: true,
	closeAction: 'hide',	
	split: true,
	bodyPadding: '10 10 0',	
	fieldDefaults: {
		labelAlign: 'right',
		labelWidth: 70,
		msgTarget: 'qtip'
	},

	constructor: function(cnfg) {
        this.callParent(arguments);
        this.initConfig(cnfg);	
    },		
	
	onTextFieldChange: function(v) {
		var me = this;			
		if (v && 1==0) {
			me.duplicateCheck = true;
			me.query = v;
			views['corporate'].store.getProxy().extraParams = {handle: 'web', action: 'select', func: me.func, query: me.query};
			views['corporate'].store.loadPage(1, {callback: function() {
				if (me.up().down("#customer_duplicate_warning")) {												
					if (me.duplicateCheck && views['corporate'].store.getCount() > 0)						
						me.up().down("#customer_duplicate_warning").setText('Ижил мэдээлэл '+views['corporate'].store.getTotalCount()+' ширхэг байна !');
					else
						me.up().down("#customer_duplicate_warning").setText('');
				}
			}});
		} else {
			me.duplicateCheck = false;
			views['corporate'].store.getProxy().extraParams = {handle: 'web', action: 'select', func: me.func};
			views['corporate'].store.loadPage(1);
		}
	},

	convertLatin: function(value) {
		value = value.toLowerCase();

		chrs = [];
		chrs['а'] = 'a';chrs['ж'] = 'j';chrs['ө'] = 'u';chrs['ц'] = 'ts';chrs['ю'] = 'yu';
		chrs['б'] = 'b';chrs['и'] = 'i';chrs['п'] = 'p';chrs['ч'] = 'ch';chrs['я'] = 'ya';
		chrs['в'] = 'v';chrs['й'] = 'i';chrs['р'] = 'r';chrs['ш'] = 'sh';chrs['ф'] = 'f';
		chrs['г'] = 'g';chrs['к'] = 'k';chrs['с'] = 's';chrs['щ'] = 'sch';
		chrs['д'] = 'd';chrs['л'] = 'l';chrs['т'] = 't';chrs['ь'] = 'i';
		chrs['е'] = 'е';chrs['м'] = 'm';chrs['у'] = 'u';chrs['ъ'] = 'i';
		chrs['ё'] = 'yo';chrs['н'] = 'n';chrs['ү'] = 'u';chrs['ы'] = 'i';
		chrs['з'] = 'z';chrs['о'] = 'o';chrs['х'] = 'kh';chrs['э'] = 'e';
		chrs['.'] = '.';chrs['-'] = '-'; chrs[' '] = ' ';
		
		v1 = '';
		for (i = 0; i < value.length; i++) {
			if (chrs[value.charAt(i)])						
				v1 = v1 + chrs[value.charAt(i)];
			else
				v1 = v1 + value.charAt(i);
		}

		return v1.toUpperCase(); //this.capitalise(v1)+' '+this.capitalise(v2);
	},


	initComponent: function() {
		var me = this;
		var name = me.record.get('firstName');

		me.items = [{
				xtype: 'fieldset',
				title: 'Main information',
				collapsible: true,
				defaultType: 'textfield',
				layout: 'anchor',
				defaults: {
					anchor: '100%',
					margin: '20 20 20 20'
				},
				items: [{
					xtype: 'fieldcontainer',
					fieldLabel: 'Account',
					layout: 'hbox',
					combineErrors: true,
					defaultType: 'textfield',
					defaults: {
						hideLabel: 'true'
					},
					items: [{
						id: 'firstName',
						name: 'firstName',
						fieldLabel: 'Name',
						flex: 0.5,
						value: '',
						focused: true,
						maskRe : /[а-яөүА-ЯӨҮ]/,
						emptyText: 'Нэр',
						allowBlank: false,
						listeners: {
							keyup: {
								element: 'el',
								fn: function() {
									me.firstName = Ext.getCmp('contact_form').getForm().findField('firstName').getValue();
									me.lastName = Ext.getCmp('contact_form').getForm().findField('lastName').getValue();
									Ext.getCmp('contact_form').getForm().findField("engName").setValue(me.convertLatin(me.firstName, me.lastName));
								},
								scope: this,
								buffer: 100
							},
							afterrender: function(field) {
								field.focus();
							}
						}
					},{
						id: 'lastName',
						name: 'lastName',
						fieldLabel: 'Нэр',
						flex: 0.5,
						value: '',
						margins: '0 0 0 6',
						maskRe : /[а-яөүА-ЯӨҮ]/,
						emptyText: 'Group',
						allowBlank: false,
						listeners: {
							keyup: {
								element: 'el',
								fn: function() {
									me.firstName = Ext.getCmp('contact_form').getForm().findField('firstName').getValue();
									me.lastName = Ext.getCmp('contact_form').getForm().findField('lastName').getValue();
									Ext.getCmp('contact_form').getForm().findField("engName").setValue(me.convertLatin(me.firstName, me.lastName));									
								},
								scope: this,
								buffer: 100
							},
							afterrender: function(field) {
								field.focus();
							}
						}
					},{
						name: 'engName',
						fieldLabel: 'engName',
						flex: 0.5,
						margins: '0 0 0 6',
						emptyText: 'Latin'
					},{
						name: 'company_torol',
						width: 60,
						emptyText: 'Company type',
						margins: '0 0 0 6',
						xtype: 'combo',
						value: 'ХХК',
						store: Ext.create('Ext.data.Store', {
						  model: 'CRM_ITEM',
						  data: [{value: 'ХХК'},{value: 'ХК'},{value: 'ТӨХК'},{value: 'ТББ'},{value: 'ББСБ'},{value: 'ТӨҮГ'},{value: 'ОНӨҮГ'},{value: 'ХЗХ'}]
						}),
						queryMode: 'local',
						displayField: 'value',
						valueField: 'value',
						triggerAction: 'all',
						editable: false
					}]
				}, {
					xtype: 'container',
					layout: 'hbox',
					defaultType: 'textfield',
					items: [{
						fieldLabel: 'Web',
						name: 'www',
//						vtype: 'url',
						maxLength: 32,
						flex: 0.5
					}, {
						name: 'source',
						labelWidth: 50,
						flex: 0.5,
						fieldLabel: 'Source',
						margins: '0 0 0 6',
						xtype: 'combo',
						value: 'employee referral',
						store: Ext.create('Ext.data.Store', {
						  model: 'CRM_ITEM',
						  data: [{value: 'partner'},{value: 'employee referral'},{value: 'external referral'},{value: 'public relations'},{value: 'party'},{value: 'advertisement'},{value: 'cold call'},{value: 'web research'}]
						}),							  
						queryMode: 'local',
						displayField: 'value',
						valueField: 'value',
						triggerAction: 'all',
						editable: false
					}]
				}, {
					xtype: 'container',
					layout: 'hbox',
					defaultType: 'textfield',
					items: [{
						fieldLabel: 'Level',
						xtype: 'combo',
						value: 'suspect',
						name: 'level',
						store: Ext.create('Ext.data.Store', {
						  model: 'CRM_ITEM',
						  data: [{value: 'customer'},{value: 'prospect'},{value: 'suspect'}]
						}),
						queryMode: 'local',
						displayField: 'value',
						valueField: 'value',
						hidden: true,
						triggerAction: 'all',
						editable: false,
						flex: 0.5
					}]
				}]
			}
		];

		me.buttons = [{
			itemId: 'customer_duplicate_warning',
			xtype: 'tbtext',
			text: '',
			cls: 'warning'
		},'->',{
			text : 'Reset',
			iconCls:'reset',
			handler: function() {
				var form = this.up('form').getForm();
				form.reset();
			}
		},{
			text: 'Commit',
			iconCls:'commit',
			handler: function() {
				var form = this.up('form').getForm();
				if (form.isValid())	{
					var values = form.getValues(true);	
					
					Ext.Ajax.request({
					   url: 'avia.php',
					   params: {handle: 'web', action: 'insert', table: 'crm_customer', func: '', values: values, fields: '', where: ''},
					   success: function(response, opts) {
						    Ext.MessageBox.alert('Status', 'Success !', function() {});
							form.reset();
					   },
					   failure: function(response, opts) {										   
						  Ext.MessageBox.alert('Status', 'Error !', function() {});
					   }
					});
				}
			}
		}];

		me.callParent(arguments);
	}
});



Ext.define('OCS.UploadForm', {
	extend: 'Ext.form.Panel',
	border: false,
	region: 'center',
	width: 480,
	height: 210,
	bodyPadding: '10 10 0',	

	constructor: function(cnfg) {
        this.callParent(arguments);
        this.initConfig(cnfg);	
    },				

	initComponent: function() {
		var me = this;

		me.items = [{
			id: 'upload-name',
			name: 'upload-name',
            xtype: 'textfield',
            fieldLabel: 'Name',
			value: this.name,
			width: 430
        },{
            xtype: 'filefield',
            id: 'form-file',
            emptyText: 'Select an file',
            fieldLabel: 'File',
            name: 'xls-path',
			width: 430,
            buttonText: '',
            buttonConfig: {
                iconCls: 'upload-icon'
            }
        }];
		
		me.buttons = [{
            text: 'Import',
			iconCls: 'commit',
            handler: function(){
                var form = this.up('form').getForm();
                if(form.isValid()){
                    form.submit({
                        url: 'avia.php',
						params: {handle: 'file', action:'import', where: form.findField('upload-name').getValue()},
                        waitMsg: 'Uploading your data...',
                        success: function(fp, o) {				
							var data = Ext.decode(o.response.responseText);
							me.win.close();
                  			Ext.MessageBox.alert('Status', data.msg, function() {
								if (me.name == 'Contact')								
									views['retail'].store.loadPage(1);
								if (me.name == 'Account')								
									views['corporate'].store.loadPage(1);
								if (me.name == 'Deal')								
									views['deals'].reload();
							});
                        }
                    });
                }
            }
        },{
            text: 'Reset',
			iconCls: 'reset',
            handler: function() {
                this.up('form').getForm().reset();
            }
        }];

		me.callParent(arguments);
	}
});



Ext.define('OCS.MergeRecordForm', {
	extend: 'Ext.form.Panel',
	border: false,
	region: 'center',
	autoScroll: true,
	bodyPadding: '10 10 0',		

	constructor: function(cnfg) {
        this.callParent(arguments);
        this.initConfig(cnfg);	
    },				

	initComponent: function() {
		var me = this;
		me.fields = '';
		if (me.name == 'Contact')				
			me.fields = 'firstName,lastName,gender,regNo,work_status,title,job_title,phone,phone1,email,country,city,district,horoo,address,descr,source';
		else
			me.fields = 'firstName,lastName,company_torol,regNo,industry,industry_sub,capital,annual_revenue,tatvar,phone,phone1,fax,email,www,country,city,district,horoo,address,descr,source';

		me.fs = me.fields.split(',');
		me.items = [];
		for (i = 0; i < me.fs.length; i++) {
			me.items[i] = {
				xtype: 'radiogroup',
				fieldLabel: me.fs[i],	
				items: [
					{boxLabel: me.master.get(me.fs[i]), name: me.fs[i], labelAlign: 'right', inputValue: me.master.get(me.fs[i]), checked: true},
					{boxLabel: me.slave.get(me.fs[i]), name: me.fs[i], inputValue: me.slave.get(me.fs[i])}
				]
			};
		}
		
		me.buttons = [{
            text: 'Commit',
			iconCls: 'commit',
            handler: function(){
                var form = this.up('form').getForm();
                if(form.isValid()){
					var values = '';
					for (i = 0; i < me.fs.length; i++) {
						values += me.fs[i]+"='"+form.findField(me.fs[i]).getGroupValue()+"',";
					}

					values = values.substring(0, values.length - 1);
					Ext.Ajax.request({
					   url: 'avia.php',					   
					   params : {handle: 'web', action: 'merge_records', func: '',values:values, where: me.master.get('crm_id')+','+me.slave.get('crm_id')},
					   success: function(response, opts) {						  
						  Ext.MessageBox.alert('Status', 'Success !', function() {
							  views['retail'].store.loadPage(1);
							  me.win.close();
						  });
					   },
					   failure: function(response, opts) {										   
						  Ext.MessageBox.alert('Status', 'Error !', function() {});
					   }
					});		
                }
            }
        },{
            text: 'Reset',
			iconCls: 'reset',
            handler: function() {
                this.up('form').getForm().reset();
            }
        }];

		me.callParent(arguments);
	}
});