Ext.define('OCS.CampaignChartRevenue', {
	extend: 'Ext.chart.Chart',
	animate: true,
	shadow: false,
	insetPadding: 50,
	legend: {
		position: 'bottom'
	},

	initComponent: function() {
		var me = this;

		me.store = Ext.create('Ext.data.Store', {
			fields: ['campaign_type', 'campaign_target', 'campaign_cost', 'actual_revenue', 'in_progress'],
			proxy: {				
				type: 'ajax',
    			url: 'avia.php',
				actionMethods: {
					create : 'POST',
					read   : 'POST',
					update : 'POST',
					destroy: 'POST'
				},
    	        reader: {
    	            root:'items',
    	            totalProperty: 'results'
    	        },				
				simpleSortMode: true,
				extraParams: {handle: 'web', action: 'select', func: 'crm_campaign_by_revenue_list', start_date: new Date(new Date().getFullYear(), 0, 1), end_date: new Date(new Date().getFullYear(), 11, 31)}
			}
		});	

		me.reloadData();

		me.axes = [{
			type: 'Numeric',
			position: 'left',
			fields: ['campaign_target', 'campaign_cost', 'actual_revenue', 'in_progress'],
			title: false,
			grid: false,
			majorTickSteps: 1,
			minimum: 0,
			label: {
				renderer: function(v) {
					return String(v).replace(/(.)00000$/, '.$1M');
				}
			}
		}, {
			type: 'Category',
			position: 'bottom',
			fields: ['campaign_type'],
			title: true
		}];

		me.series = [{
			type: 'column',
			axis: 'bottom',
			gutter: 80,
			xField: 'campaign_type',
			yField: ['campaign_cost', 'in_progress', 'actual_revenue', 'campaign_target'],
			tips: {
				trackMouse: true,
				width: 65,
				height: 28,
				renderer: function(storeItem, item) {
					this.setTitle(String(item.value[1] / 1000000) + 'M');
				}
			}
		}];
		
		me.callParent(arguments);
	},

	reloadData: function() {
		var me = this;
		me.store.load();
	},

	rangeData: function(e1, e2) {
		var me = this;
		me.store.getProxy().extraParams = {handle: 'web', action: 'select', func: 'crm_campaign_by_revenue_list', start_date: e1, end_date: e2};
		me.store.load();
	}
});


Ext.define('OCS.OpportunityRevenueChart', {
	extend: 'Ext.chart.Chart',
	animate: true,
	shadow: false,
	insetPadding: 50,
	legend: {
		position: 'bottom'
	},

	initComponent: function() {
		var me = this;

		me.store = Ext.create('Ext.data.Store', {
			fields: ['owner', 'actual_revenue', 'expected_revenue', 'target_revenue'],
			pageSize: 5,
			proxy: {				
				type: 'ajax',
    			url: 'avia.php',
				actionMethods: {
					create : 'POST',
					read   : 'POST',
					update : 'POST',
					destroy: 'POST'
				},
    	        reader: {
    	            root:'items',
    	            totalProperty: 'results'
    	        },				
				simpleSortMode: true,
				extraParams: {handle: 'web', action: 'select', func: 'crm_opportunity_by_revenue_list', start_date: new Date(new Date().getFullYear(), 0, 1), end_date: new Date(new Date().getFullYear(), 11, 31), values: 'user_level', where: 0}
			}
		});

		me.reloadData();

		me.axes = [{
			type: 'Numeric',
			position: 'left',
			fields: ['actual_revenue', 'expected_revenue', 'target_revenue'],
			title: false,
			grid: false,
			majorTickSteps: 0,
			minimum: 0,
			label: {
				renderer: function(v) {
					return String(v).replace(/(.)00000$/, '.$1M');
				}
			}
		}, {
			type: 'Category',
			position: 'bottom',
			fields: ['owner'],
			label   : {
	             rotation:{
					 degrees:345
				 }
	        },
			title: true
		}];

		me.series = [{
			type: 'column',
			axis: 'bottom',
			gutter: 80,
			xField: 'owner',
			yField: ['actual_revenue', 'expected_revenue', 'target_revenue'],
//			stacked: true,
			tips: {
				trackMouse: true,
				width: 150,
				height: 28,
				renderer: function(storeItem, item) {
					this.setTitle(item.value[0]+' '+String(item.value[1] / 1000000) + 'M');
				}
			}
		}];

		me.callParent(arguments);
	},

	reloadData: function() {
		var me = this;
		me.store.load();
	},

	rangeData: function(e1, e2) {
		var me = this;
		me.store.getProxy().extraParams = {handle: 'web', action: 'select', func: 'crm_opportunity_by_revenue_list', start_date: e1, end_date: e2, values: 'user_level', where: 0};
		me.store.load();
	}
});

Ext.define('OCS.CampaignChartSuccess', {
	extend: 'Ext.chart.Chart',
	animate: true,
	shadow: true,
	insetPadding: 50,
	legend: {
		position: 'bottom'
	},

	initComponent: function() {
		var me = this;

		me.store = Ext.create('Ext.data.Store', {
			fields: ['campaign_type', 'target', 'success', 'unsuccess', 'pending'],
			proxy: {				
				type: 'ajax',
    			url: 'avia.php',
				actionMethods: {
					create : 'POST',
					read   : 'POST',
					update : 'POST',
					destroy: 'POST'
				},
    	        reader: {
    	            root:'items',
    	            totalProperty: 'results'
    	        },				
				simpleSortMode: true,
				extraParams: {handle: 'web', action: 'select', func: 'crm_campaign_by_status_list'}
			}
		});
		
		me.reloadData();

		me.axes = [{
			type: 'Numeric',
			position: 'left',
			fields: ['target', 'success', 'unsuccess', 'pending'],
			title: false,
			grid: false,
			majorTickSteps: 1,
			minimum: 0
		}, {
			type: 'Category',
			position: 'bottom',
			fields: ['campaign_type'],
			title: true
		}];

		me.series = [{
			type: 'column',
			axis: 'bottom',
			gutter: 80,
			xField: 'campaign_type',
			yField: ['target', 'success', 'unsuccess', 'pending'],
			stacked: true,
			tips: {
				trackMouse: true,
				width: 65,
				height: 28,
				renderer: function(storeItem, item) {
					this.setTitle(String(item.value[1]));
				}
			}
		}];

		me.callParent(arguments);
	},

	reloadData: function() {
		var me = this;
		me.store.load();
	}
});


Ext.define('OCS.CasesByStatus', {
	extend: 'Ext.chart.Chart',
	animate: true,
	shadow: false,
	insetPadding: 30,
	legend: {
		position: 'bottom'
	},

	initComponent: function() {
		var me = this;
		
		me.store = Ext.create('Ext.data.JsonStore', {
			fields: ['name', 'value'],
			proxy: {				
				type: 'ajax',
    			url: 'avia.php',
				actionMethods: {
					create : 'POST',
					read   : 'POST',
					update : 'POST',
					destroy: 'POST'
				},
    	        reader: {
    	            root:'items',
    	            totalProperty: 'results'
    	        },				
				simpleSortMode: true,
				extraParams: {handle: 'web', action: 'select', func: 'crm_complain_by_status_list'}
			}
		});
		
		me.reloadData();
		
		me.series = [{
			type: 'pie',
			field: 'value',
			showInLegend: true,
			donut: false,
			tips: {
			  trackMouse: true,
			  width: 140,
			  height: 28,
			  renderer: function(storeItem, item) {				
				this.setTitle(storeItem.get('name') + ': ' + storeItem.get('value'));
			  }
			},
			highlight: {
			  segment: {
				margin: 5
			  }
			},
			label: {
				field: 'name',
				display: 'rotate',
				contrast: true,
				font: '11px Segoe UI'		
			}
		}];

		me.callParent(arguments);
	},

	reloadData: function() {
		var me = this;
		me.store.load();
	},

	rangeData: function(e1, e2) {
		var me = this;
		me.store.getProxy().extraParams = {handle: 'web', action: 'select', func: 'crm_complain_by_status_list', start_date: e1, end_date: e2};
		me.store.load();
	}
});

Ext.define('OCS.SalesStagePipeLine', {
	extend: 'Ext.chart.Chart',
	animate: true,
	shadow: false,
	legend: {
		position: 'right'
	},
	insetPadding: 50,
	theme: 'Base:gradients',

	initComponent: function() {
		var me = this;
		
		me.store = Ext.create('Ext.data.Store', {
			fields: ['name', 'value'],
			proxy: {				
				type: 'ajax',
    			url: 'avia.php',
				actionMethods: {
					create : 'POST',
					read   : 'POST',
					update : 'POST',
					destroy: 'POST'
				},
    	        reader: {
    	            root:'items',
    	            totalProperty: 'results'
    	        },				
				simpleSortMode: true,
				extraParams: {handle: 'web', action: 'select', func: 'crm_stage_of_sales_pipeline_list'}
			}
		});
		
		me.reloadData();

		me.series = [{
			type: 'pie',
			field: 'value',
			showInLegend: true,
			donut: false,
			tips: {
			  trackMouse: true,
			  width: 140,
			  height: 28,
			  renderer: function(storeItem, item) {				
				this.setTitle(storeItem.get('name') + ': ' + storeItem.get('value'));
			  }
			},
			highlight: {
			  segment: {
				margin: 5
			  }
			},
			label: {
				field: 'name',
				display: 'rotate',
				contrast: true,
				font: '11px Segoe UI'		
			}
		}];

		me.callParent(arguments);
	},

	reloadData: function() {
		var me = this;
		me.store.load();
	}
});


Ext.define('OCS.AccountByIndustry', {
	extend: 'Ext.chart.Chart',
	animate: true,
	shadow: false,
	legend: {
		position: 'right'
	},
	insetPadding: 50,
	theme: 'Base:gradients',

	initComponent: function() {
		var me = this;
		
		me.store = Ext.create('Ext.data.Store', {
			fields: ['name', 'value'],
			proxy: {				
				type: 'ajax',
    			url: 'avia.php',
				actionMethods: {
					create : 'POST',
					read   : 'POST',
					update : 'POST',
					destroy: 'POST'
				},
    	        reader: {
    	            root:'items',
    	            totalProperty: 'results'
    	        },				
				simpleSortMode: true,
				extraParams: {handle: 'web', action: 'select', func: 'crm_account_by_industry_list'}
			}
		});
		
		me.reloadData();

		me.series = [{
			type: 'pie',
			field: 'value',
			showInLegend: true,
			donut: false,
			tips: {
			  trackMouse: true,
			  width: 140,
			  height: 28,
			  renderer: function(storeItem, item) {				
				this.setTitle(storeItem.get('name') + ': ' + storeItem.get('value'));
			  }
			},
			highlight: {
			  segment: {
				margin: 5
			  }
			},
			label: {
				field: 'name',
				display: 'rotate',
				contrast: true,
				font: '11px Segoe UI'		
			}
		}];

		me.callParent(arguments);
	},

	reloadData: function() {
		var me = this;
		me.store.load();
	}
});

Ext.define('OCS.OpportunityByProbability', {
	extend: 'Ext.chart.Chart',
	animate: true,
	shadow: false,
	legend: {
		position: 'right'
	},
	insetPadding: 50,
	theme: 'Base:gradients',

	initComponent: function() {
		var me = this;
		
		me.store = Ext.create('Ext.data.Store', {
			fields: ['name', 'value'],
			proxy: {				
				type: 'ajax',
    			url: 'avia.php',
				actionMethods: {
					create : 'POST',
					read   : 'POST',
					update : 'POST',
					destroy: 'POST'
				},
    	        reader: {
    	            root:'items',
    	            totalProperty: 'results'
    	        },				
				simpleSortMode: true,
				extraParams: {handle: 'web', action: 'select', func: 'crm_potential_by_probablity_list'}
			}
		});
		
		me.reloadData();

		me.series = [{
			type: 'pie',
			field: 'value',
			showInLegend: true,
			donut: false,
			tips: {
			  trackMouse: true,
			  width: 140,
			  height: 28,
			  renderer: function(storeItem, item) {				
				this.setTitle(storeItem.get('name') + ' %: ' + storeItem.get('value'));
			  }
			},
			highlight: {
			  segment: {
				margin: 5
			  }
			},
			label: {
				field: 'name',
				display: 'rotate',
				contrast: true,
				font: '11px Segoe UI'		
			}
		}];

		me.callParent(arguments);
	},

	reloadData: function() {
		var me = this;
		me.store.load();
	}
});

Ext.define('OCS.LeadBySource', {
	extend: 'Ext.chart.Chart',
	animate: true,
	shadow: false,
	legend: {
		position: 'right'
	},
	insetPadding: 50,
	theme: 'Base:gradients',

	initComponent: function() {
		var me = this;
		
		me.store = Ext.create('Ext.data.Store', {
			fields: ['name', 'value'],
			proxy: {				
				type: 'ajax',
    			url: 'avia.php',
				actionMethods: {
					create : 'POST',
					read   : 'POST',
					update : 'POST',
					destroy: 'POST'
				},
    	        reader: {
    	            root:'items',
    	            totalProperty: 'results'
    	        },				
				simpleSortMode: true,
				extraParams: {handle: 'web', action: 'select', func: 'crm_lead_by_source_list'}
			}
		});
		
		me.reloadData();

		me.series = [{
			type: 'pie',
			field: 'value',
			showInLegend: true,
			donut: false,
			tips: {
			  trackMouse: true,
			  width: 140,
			  height: 28,
			  renderer: function(storeItem, item) {				
				this.setTitle(storeItem.get('name') + ': ' + storeItem.get('value'));
			  }
			},
			highlight: {
			  segment: {
				margin: 5
			  }
			},
			label: {
				field: 'name',
				display: 'rotate',
				contrast: true,
				font: '11px Segoe UI'				
			}
		}];

		me.callParent(arguments);
	},

	reloadData: function() {
		var me = this;
		me.store.load();
	}
});

