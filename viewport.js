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
		 views['topbar'] = Ext.create('Ext.Component', {
			id: 'topbar',
			region: 'north',
			height: 32, 
			html:'<div class="caption">'+
					'<table cellpadding=0 cellspacing=0><tr><td class="padding'+(pk=='dashboard'?' active':'')+'"><a href="index.php?pk=dashboard">Dashboard</a></td><td class="padding'+(pk=='workspace'?' active':'')+'"><a href="index.php?pk=workspace">Activities</a></td><td class="padding'+(pk=='deals'?' active':'')+'"><a href="index.php?pk=deals">Deals</a></td><td class="padding'+(pk=='reseller'?' active':'')+'"><a href="index.php?pk=reseller">Reseller</a></td><td class="padding'+(pk=='retail'?' active':'')+'"><a href="index.php?pk=retail">Contacts</a></td><td class="padding'+(pk=='corporate'?' active':'')+'"><a href="index.php?pk=corporate">Accounts</a></td><td class="padding'+(pk=='cases'?' active':'')+'"><a href="index.php?pk=cases">Cases</a></td><td class="padding'+(pk=='campaigns'?' active':'')+'"><a href="index.php?pk=campaigns">Campaigns</a></td><td class="padding'+(pk=='services'?' active':'')+'"><a href="index.php?pk=services">Services</a></td><td class="padding'+(pk=='competitor'?' active':'')+'"><a href="index.php?pk=competitor">Competitors</a></td><td class="padding'+(pk=='quotes'?' active':'')+'"><a href="index.php?pk=quotes">Invoices</a></td><td class="padding'+(pk=='sales'?' active':'')+'"><a href="index.php?pk=sales">Contracts</a></td><td class="padding'+(pk=='goal'?' active':'')+'"><a href="index.php?pk=goal">Goals</a></td><td class="padding'+(pk=='product'?' active':'')+'"><a href="index.php?pk=product">Products</a></td><td class="padding'+(pk=='reports'?' active':'')+'"><a href="index.php?pk=reports">Reports</a></td><td class="padding'+(pk=='settings'?' active':'')+'"><a href="index.php?pk=settings">Settings</a></td><td class="padding" style="float:right"><a href="logout.php">Logout</a></td></tr></table>'+
 				 '</div>'
		 });
		 if (pk == 'retail')
			 views['retail'] = new OCS.RetailPanel();

		 if (pk == 'corporate')
			 views['corporate'] = new OCS.CorporatePanel();

		 if (pk == 'cases')
			 views['cases'] = new OCS.Cases();

		 if (pk == 'dashboard')
			 views['dashboard'] = new OCS.Dashboard();

		 if (pk == 'workspace')
			 views['workspace'] = new OCS.Workspace();

		if (pk == 'campaigns')
			 views['campaigns'] = new OCS.Campaigns();

		 if (pk == 'competitor')
			 views['competitor'] = new OCS.Competitors();

		 if (pk == 'reports')
			 views['reports'] = new OCS.Reports();

		 if (pk == 'deals')
			 views['deals'] = new OCS.Deals();

		 if (pk == 'services')
			 views['services'] = new OCS.Services();

		 if (pk == 'reseller')
			 views['reseller'] = new OCS.Reseller();

		 if (pk == 'quotes')
			 views['quotes'] = new OCS.QuotePanel();

		 if (pk == 'sales')
			 views['sales'] = new OCS.SalesPanel();

		 if (pk == 'settings')
			 views['settings'] = new OCS.SettingsPanel();

		 if (pk == 'goal')
			 views['goal'] = new OCS.GoalsPanel();

		 if (pk == 'product')
			 views['product'] = new OCS.ProductPanel();


		 me.items = [			
			views['topbar'],
			views[pk].createPanel()	
		];				
				
		me.callParent(arguments);
	}
});