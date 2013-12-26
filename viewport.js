var views = [];
var shows = [];
Ext.define('OCS.Viewport', {
	extend : 'Ext.Viewport',
	
	constructor: function(cnfg) {
        this.callParent(arguments);
        this.initConfig(cnfg);
    },

	initComponent: function() {
		 var me = this;
		 
		 me.alert = new OCS.AlarmWindow({
			modal: false,
			height: 400			
		 });
		 shows['dashboard'] = (user_level == 3);

		 views = [];
		 views['retail'] = new OCS.RetailPanel();
		 views['corporate'] = new OCS.CorporatePanel();
		 views['property'] = new OCS.DetailGrid();
		 views['activity'] = new OCS.ActivityGrid();
		 views['opportunity'] = new OCS.OpportunityGrid();
		 views['cases'] = new OCS.Cases();
		 views['csales'] = new OCS.CustomerSalesPanel();

		 views['case'] = new OCS.CaseGrid();
		 views['dashboard'] = new OCS.Dashboard();
		 views['workspace'] = new OCS.Workspace().createPanel();
		 views['deals'] = new OCS.Deals();
		 views['campaigns'] = new OCS.Campaigns();
		 views['quotes'] = new OCS.QuotePanel();
		 views['sales'] = new OCS.SalesPanel();
//		 views['salesorders'] = new OCS.SalesOrders();
		 views['settings'] = new OCS.SettingsPanel().createPanel();
		
		 views['mainTabs'] = Ext.create('Ext.tab.Panel', {
			region: 'center', 
			deferredRender: true,
			margins: '0 0 0 0',
			activeTab: 0,		
			minTabWidth: 80,
			tabWidth: 95,
			cls: 'MainPanel',
			autoWidth:true,
			autoHeight:true,
			listeners: {
				'tabchange': function(tabPanel, tab){					
					if (!(tab.title == 'Contact' || tab.title == 'Account'))					
						Ext.getCmp('customerComponent').collapse();						

					if (tab.title == 'Dashboard') {
						views['dashboard'].reloadCharts();
					} else
					if (tab.title == 'Cases') {
						views['cases'].reload();
					} else
					if (tab.title == 'Invoices') {
						views['quotes'].reload();
					} else
					if (tab.title == 'Deals') {
						views['deals'].reload();
					} else
					if (tab.title == 'Contracts') {
						views['sales'].reload();
					}
				}
			},
			items: [{
				title: 'Dashboard',
				autoScroll: true,
				hidden: shows['dashboard'],
				items: views['dashboard'].createPanel()
			},{
				title: 'Activities',
				id: 'workspace',
				layout: 'border',		
				border: false,
				items: views['workspace']
			}, {
				title: 'Deals',
				id: 'leads_opportuny',
				layout: 'border',
				border: false,
				items: views['deals'].createPanel()
			},{
				title: 'Contacts',
				id: 'retail',
				layout: 'border',
//					hidden: !(userType == 'retail'),
				items: views['retail'].createGrid()
			}, {
				title: 'Accounts',
				id: 'corporate',
				layout: 'border',
	//			hidden: !(userType == 'corporate'),
				items: views['corporate'].createGrid()
			},{
				title: 'Cases',
				id: 'cases',
				layout: 'border',
				items: views['cases'].createPanel()
			},{
				title: 'Campaigns',
				id: 'campaigns',
				layout: 'border',
				items: views['campaigns'].createPanel()
			},{
				title: 'Invoices',
				layout: 'border',
				items: views['quotes'].createGrid()
			},{
				title: 'Contracts',
				layout: 'border',
				items: views['sales'].createGrid()
			},{
				title: 'Reports',
				hidden: true
			},{
				title: 'Settings',
				layout: 'border',
				items: views['settings']
			}]
		});

		 me.items = [			
			 Ext.create('Ext.Component', {
				region: 'north',
				height: 32, 
				autoEl: {
					tag: 'div',
					html:'<div class="caption">'+
							'<span class="captitle">Optimal CRM [Хувилбар 2.0.2]</span>'+
							'<a href="logout.php" class="logout"><table cellpadding=0 cellspacing=0><tr><td><img class="avatar" src="images/user_male2-48.png"/></td><td>&nbsp;&nbsp;'+logged+' | Гарах</td></tr></table></a>'+
						  '</div>'
				}
			}), Ext.create('Ext.Component', {
				region: 'south',
				height: 0
			}), {
				id: 'customerComponent',
				xtype: 'tabpanel',
				region: 'east',
				title: 'Харилцагч',			
				animCollapse: true,
				collapsible: true,
				collapsed: true,
				split: true,
				width: 500, // give east and west regions a width
				minSize: 450,
				maxSize: 500,
				margins: '0 0 0 0',
				activeTab: 0,
				cls: 'MainPanel',
				tabPosition: 'top',			
				items: [					
						views['property'].createPanel(),
						views['activity'].createPanel(),
						views['case'].createPanel(),
						views['opportunity'].createPanel(),
						views['csales'].createPanel()
				]
			}, 			
			views['mainTabs']
		];
		
		
		me.callParent(arguments);
	}
});