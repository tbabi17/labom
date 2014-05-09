var crm_id = '';
var selected;
var selectedLead;
var selectedQuote;
var selectedOwner;
var fields = [];
var columns = [];
var customers = [];
var campaigns = [];

Ext.define('CRM_ITEM', {
	extend: 'Ext.data.Model',
	fields: [{name: 'value'}]
});

Ext.define('CRM_OBJECT', {
	extend: 'Ext.data.Model',
	fields: [{name: 'id', type: 'int'}, {name: 'value'}]
});

Ext.define('CRM_NEXT', {
	extend: 'Ext.data.Model',
	fields: [{name: 'value', type: 'int'}, {name: 'name'}]
});

Ext.define('CRM_PREV', {
	extend: 'Ext.data.Model',
	fields: [{name: 'value'}, {name: 'name'}]
});

fields['CRM_RETAIL_FIELDS'] = [
   {name: 'crm_id', text: 'ID', width: 20, hidden: true},   
   {name: 'type', text: 'CRM Type', width: 50, hidden:true},   
   {name: 'level', text: '#', width: 30, align: 'center', lock: true, renderer: renderCustomerLevel},
//   {name: 'campaign', text: 'Active campaign', width: 180, hidden: true, renderer: renderCampaign},
   {name: '_class', text: 'Class', width: 50, align: 'center', renderer: renderClass},     
   {name: 'regNo', text: 'Register', width: 80, hidden: true},   
   {name: 'firstName', text: 'First name', width: 100, renderer: renderTip, primary: true},
   {name: 'lastName', text: 'Last name', width: 100},
   {name: 'crm_name', text: 'Full name', width: 180, hidden: true},
   {name: 'engName', text: 'Latin', width: 140, hidden: true},
   {name: 'birthday', text: 'Birth date', width: 70, align: 'center', hidden: true},
   {name: 'gender', text: 'Gender', width: 60, hidden: true},
   {name: 'work_status', text: 'Social status', width: 140, hidden: true},
   {name: 'title', text: 'Company', width: 270, hidden: true},
   {name: 'job_title', text: 'Position', width: 200, hidden: true},
   {name: 'job_type', text: 'Job', width: 100, hidden: true},
   {name: 'phone', text: 'Phone', width: 80, align: 'center', renderer: renderPhone},
   {name: 'phone1', text: 'Phone B', width: 70, align: 'center', renderer: renderPhone},
   {name: 'phone2', text: 'Phone C', width: 70, align: 'center', renderer: renderPhone, hidden: true},
   {name: 'fax', text: 'Fax', width: 80, hidden: true},   
   {name: 'email', text: 'Email', width: 120, renderer: renderMail},
   {name: 'www', text: 'Web', width: 100, hidden: true},
   {name: 'country', text: 'Country', width: 100, hidden: true},
   {name: 'city', text: 'City', width: 100, hidden: true},
   {name: 'district', text: 'District', width: 100, hidden: true},
   {name: 'horoo', text: 'Khoroo', width: 100, hidden: true},
   {name: 'address', text: 'Address', width: 150, hidden: true},
   {name: 'descr', text: 'Note', width: 120, hidden: true},
   {name: 'decision_maker', text: 'Decision', width: 120, hidden: true},
   {name: 'owner', text: 'Owner', width: 120, renderer:renderOwner, hidden: true},
//   {name: 'parent_crm_id', text: 'Parent CRM ID', width: 120, hidden: true},
   {name: 'customer_type', text: 'c', width: 0, hidden: true},
   {name: '_date', type: 'datetime', text: 'Created on', width: 100, align: 'center', renderer: renderCreatedDate},
   {name: 'userCode', text: 'Created by', width: 120},
   {name: 'mayDuplicate', text: 'Duplicate', width: 80, align: 'right', renderer: renderPrecent},
   {name: 'priority', text: 'Priority', width: 60, align: 'center'},
   {name: 'source', text: 'Source', width: 250}
];

Ext.define('CRM_RETAIL', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_RETAIL_FIELDS']
});

fields['CRM_CONTACT_FIELDS'] = [
   {name: 'crm_id', text: 'ID', width: 20, hidden: true},   
   {name: 'regNo', text: 'Register', width: 80, hidden: true},   
   {name: 'firstName', text: 'First name', width: 180, renderer: renderTip, hidden: true, primary: true},
   {name: 'lastName', text: 'Last name', width: 120, hidden: true},
   {name: 'crm_name', text: 'Full name', width: 250},
   {name: 'engName', text: 'Latin', width: 140, hidden: true},
   {name: 'gender', text: 'Gender', width: 60, hidden: true},
   {name: 'title', text: 'Company', width: 200},
   {name: 'job_title', text: 'Position', width: 150},
   {name: 'phone', text: 'Phone', width: 80, align: 'center', renderer: renderPhone},
   {name: 'phone1', text: 'Phone B', width: 70, align: 'center', renderer: renderPhone},
   {name: 'email', text: 'Email', width: 120, renderer: renderMail},
   {name: 'decision_maker', text: 'Decision', width: 120, hidden: true},
   {name: 'owner', text: 'Owner', width: 120, renderer:renderOwner, hidden: true},
   {name: 'userCode', text: 'Created by', width: 120, hidden: true},
];

Ext.define('CRM_CONTACT', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_CONTACT_FIELDS']
});

fields['CRM_CORPORATE_FIELDS'] = [
   {name: 'crm_id', text: 'ID', width: 20, hidden: true},   
   {name: 'type', text: 'CRM Type', width: 50, hidden:true},   
   {name: 'level', text: '#', width: 30, align: 'center', lock: true, renderer: renderCustomerLevel},
   {name: '_class', text: 'Class', width: 75, align: 'center', renderer: renderClass},      
   {name: 'regNo', text: 'Register', width: 65, align: 'center'},   
   {name: 'firstName', text: 'Name', width: 180, renderer: renderTip, primary: true},
   {name: 'lastName', text: 'Parent name', width: 120},
   {name: 'engName', text: 'Latin', width: 180, hidden: true},
   {name: 'phone', text: 'Phone', width: 70, align: 'center', renderer: renderPhone},
   {name: 'phone1', text: 'Phone B', width: 70, align: 'center', hidden: true, renderer: renderPhone},
   {name: 'phone2', text: 'Phone C', width: 70, align: 'center', renderer: renderPhone, hidden: true},
   {name: 'fax', text: 'Fax', width: 90, align: 'center'},
   {name: 'email', text: 'E-mail', width: 100, hidden: true, renderer: renderMail},
   {name: 'www', text: 'Web', width: 120, renderer: renderWWW},
   {name: 'capital', text: 'Capital', type: 'float', width: 100, hidden: true, align: 'right', renderer: renderMoney},
   {name: 'annual_revenue', text: 'Annual revenue', type: 'float', hidden: true, width: 100, align: 'right', renderer: renderMoney},
   {name: 'tatvar', text: 'Tax amount', type: 'float', hidden: true, width: 100, align: 'right', renderer: renderMoney},
   {name: 'company_torol', text: 'Type', width: 40, align: 'center'},
   {name: 'industry', text: 'Industry', width: 150},
   {name: 'industry_sub', text: 'Organization', width: 150},
   {name: 'employees', text: 'Employees', width: 80, align: 'center'},
   {name: 'sorog_huchin', text: 'Service provider', width: 150},
  // {name: 'campaign', text: 'Active campaign', width: 180, hidden: true},
   {name: 'country', text: 'Counry', width: 100, hidden: true},
   {name: 'city', text: 'City', width: 100, hidden: true},
   {name: 'district', text: 'District', width: 100, hidden: true},
   {name: 'horoo', text: 'Khoroo', width: 100, hidden: true},
   {name: 'address', text: 'Address', width: 150, hidden: true},   
   {name: 'source', text: 'Source', width: 120},
   {name: 'descr', text: 'Note', width: 120, hidden: true},
   {name: 'owner', text: 'Owner', width: 120, renderer:renderOwner},
   {name: 'userCode', text: 'Created by', width: 120, hidden: true},
   {name: 'customer_type', text: 'c', width: 0, hidden: true},
   {name: '_date', type: 'datetime', text: 'Created on', width: 120, align: 'center', renderer: renderCreatedDate},
   {name: 'mayDuplicate', text: 'Duplicate', width: 80, renderer: renderPrecent, align: 'right'},
   {name: 'priority', text: 'Priority', width: 60, align: 'center'}
];

Ext.define('CRM_CORPORATE', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_CORPORATE_FIELDS']
});


fields['CRM_TASK_FIELDS'] = [
   {name: 'id', text: 'Task ID', width: 50, hidden:true},         
   {name: 'campaign', text: 'Campaign', width: 150, hidden: true},  
   {name: 'deal_id', text: 'Deal ID', width: 50, hidden: true},
   {name: 'case_id', text: 'Case ID', width: 50, hidden: true},
   {name: 'deal_name', text: 'Topic Name', width: 160, renderer: renderDealName},
   {name: 'subject', text: 'Subject', width: 150, primary: true},
   {name: 'task_status', text: 'Status', width: 70, align: 'center', renderer: renderTaskStatus},
   {name: 'priority', text: 'Priority', width: 70, align: 'center', renderer: renderPriority},
   {name: 'crm_id', text: 'CRM ID', hidden: true, width: 80},
   {name: 'crm_name', text: 'Customer', width: 200, renderer: renderCRMName},
   {name: 'owner', text: 'Owner', width: 80, hidden: true, renderer:renderOwner},
   {name: 'duedate', type: 'datetime', text: 'Due date', width: 90,align: 'center', dateFormat: 'Y-m-d'},
   {name: 'duetime', type: 'datetime', text: 'Due time', align: 'center', width: 60},     
   {name: 'budgeted_cost', text: 'Budgeted cost', width: 90, type: 'float', align: 'right', renderer: renderMoney},
   {name: 'remind_at', text: 'Remind', width: 90,align: 'center', dateFormat: 'Y-m-d'},
   {name: 'remind_type', text: 'Remind type', hidden: true,  width: 200},
   {name: 'descr', text: 'Description', width: 250},
   {name: 'userCode', text: 'Created by', hidden: true, width: 200},
   {name: '_date', text: 'Created on', type: 'datetime', dateFormat: 'Y-m-d', hidden: true,  width: 200, renderer: renderCreatedDate}
];

Ext.define('CRM_TASK', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_TASK_FIELDS']
});


fields['CRM_EVENT_FIELDS'] = [
   {name: 'id', text: 'ID', width: 50, hidden:true},         
   {name: 'campaign', text: 'Campaign', width: 150, hidden: true},  
   {name: 'deal_id', text: 'Deal ID', width: 50, hidden: true},
   {name: 'case_id', text: 'Case ID', width: 50, hidden: true},
   {name: 'deal_name', text: 'Topic Name', width: 160, renderer: renderDealName},
   {name: 'crm_id', text: 'CRM ID', hidden: true, width: 80},
   {name: 'crm_name', text: 'Customer', width: 200, renderer: renderCRMName},
   {name: 'event_status', text: 'Status', width: 60, renderer: renderEventStatus, align: 'center'},
   {name: 'subject', text: 'Subject', width: 150, primary: true},
   {name: 'start_date', type: 'datetime', text: 'Due date', width: 80, dateFormat: 'Y-m-d', renderer: renderDate},
   {name: 'start_time', text: 'Due time', width: 70, renderer: renderTime},
   {name: 'priority', text: 'Priority', width: 70, align: 'center', renderer: renderPriority},
   {name: 'event_type', text: 'Type', width: 70, align: 'center'},
   {name: 'venue', text: 'Venue', width: 150},
   {name: 'budgeted_cost', text: 'Budgeted cost', width: 90, type: 'float', align: 'right', renderer: renderMoney},
   {name: 'descr', text: 'Description',  width: 200},
   {name: 'owner', text: 'Owner', width: 80, hidden: true, renderer:renderOwner},
   {name: 'remind_at', type: 'date', text: 'Remind', hidden: true,  width: 200, dateFormat: 'Y-m-d'},
   {name: 'remind_type', text: 'Remind type', hidden: true,  width: 200},
   {name: 'userCode', text: 'Created by', hidden: true, width: 200},
   {name: '_date', type: 'datetime', text: 'Created on', hidden: true,  width: 200, renderer: renderCreatedDate}
];

Ext.define('CRM_EVENT', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_EVENT_FIELDS']
});


fields['CRM_CALLLOG_FIELDS'] = [
   {name: 'id', text: 'ID', width: 50, hidden:true},         
   {name: 'campaign', text: 'Campaign', width: 150, renderer: renderCampaign, hidden: true},
   {name: 'deal_id', text: 'Deal ID', hidden: true, width: 150},
   {name: 'case_id', text: 'Case ID', hidden: true, width: 150},
   {name: 'deal_name', text: 'Topic Name', width: 180, renderer: renderDealName},
   {name: 'crm_id', text: 'CRM ID', hidden: true, width: 80},
   {name: 'crm_name', text: 'Customer', width: 200, renderer: renderCRMName},
   {name: 'subject', text: 'Subject', width: 180, primary: true},
   {name: 'owner', text: 'Owner', width: 120, hidden: true, renderer:renderOwner},
   {name: 'priority', text: 'Priority', width: 70, align: 'center', renderer: renderPriority},
   {name: 'calltype', text: 'Type', width: 70},
   {name: 'purpose', text: 'Purpose', width: 60}, 
   {name: 'callresult', text: 'Status', width: 60, align: 'center', renderer: renderCallStatus},
   {name: 'duration', type: 'int', text: 'Duration', hidden: true, width: 80, align: 'right', renderer: renderSecond, summaryType: 'sum', summaryRenderer: renderTSecond},
   {name: '_from', text: 'From', width: 70, align: 'center', hidden: true},
   {name: '_to', text: 'To', width: 70, align: 'center', renderer: renderPhone, primary: true},  
   {name: 'descr', text: 'Description', width: 200, hidden: true},
   {name: 'remind_at', type: 'date', text: 'Remind', hidden: true,  width: 200, dateFormat: 'Y-m-d'},
   {name: 'remind_type', text: 'Remind type', hidden: true,  width: 200},
   {name: 'userCode', text: 'Created by', hidden: true, width: 200},
   {name: '_date', type: 'datetime', text: 'Created on', width: 200, renderer: renderCreatedDate} 
];

Ext.define('CRM_CALLLOG', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_CALLLOG_FIELDS']
});


fields['CRM_CALENDAR_FIELDS'] = [   
   {name: 'id', text: 'ID', hidden: true},
   {name: 'work_type', text: 'Type', width: 80, align: 'center', renderer: renderWorkType},
   {name: 'crm_id', text: 'CRM ID', hidden: true, width: 80},
   {name: 'crm_name', text: 'Customer', width: 200, renderer: renderCRMName},
   {name: 'deal_id', text: 'Deal ID', width: 10, hidden: true},
   {name: 'case_id', text: 'Case ID', width: 50, hidden: true},
   {name: 'deal_name', text: 'Topic name', width: 200, hidden: true},
   {name: 'phone', text: 'Phone', width: 60, align: 'center', hidden: true},
   {name: 'days', text: 'Duedate', width: 60, align: 'center', hidden: true},
   {name: 'times', text: 'Time', width: 60, align: 'center', hidden: true},
   {name: 'priority', text: 'Priority', width: 70, align: 'center', renderer: renderPriority},
   {name: 'status', text: 'Status', width: 70, align: 'center'},
   {name: 'subject', text: 'Subject', width: 200},
   {name: 'source', text: 'Source', hidden: true, width: 150},
   {name: 'owner', text: 'Owner', width: 100, renderer: renderOwner},
   {name: 'userCode', text: 'Created by', width: 100, renderer: renderOwner, hidden: true},
   {name: '_date', text: 'Created on', width: 80},
   {name: 'descr', text: 'Description', width: 200, hidden: true},
   {name: 'campaign', text: 'Campaign', hidden: true, width: 150},
   {name: 'phone', text: 'Phone/Email', hidden: true, width: 150},
   {name: 'remind_at', text: 'Remind at', hidden: true, width: 150}
];

Ext.define('CRM_CALENDAR', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_CALENDAR_FIELDS']
});

fields['CRM_WORKFLOW_FIELDS'] = [   
   {name: 'id', text: 'ID', hidden: true},
   {name: 'workflow_status', text: 'Status', width: 70, align: 'center'},
   {name: 'subject', text: 'Subject', width: 200, primary: true},
   {name: 'descr', text: 'Description', width: 200, hidden: true},
   {name: 'precent', text: 'Precent', width: 60, align: 'center', renderer: renderPrecent},
   {name: 'issue', type: 'int', text: 'Urgency', width: 60, align: 'center'},
   {name: 'start_date', text: 'Start date', width: 70, align: 'center', renderer: renderDate},
   {name: 'start_time', text: 'Start time', width: 65, align: 'center', renderer: renderTime},
   {name: 'end_date', text: 'End date', width: 70, align: 'center', renderer: renderDate},
   {name: 'end_time', text: 'End time', width: 65, align: 'center', renderer: renderTime},
   {name: 'priority', text: 'Priority', width: 70, align: 'center', renderer: renderPriority},
   {name: 'owner', text: 'Owner', width: 100, renderer: renderOwner, primary: true},
   {name: 'userCode', text: 'Created by', width: 100},
   {name: '_date', text: 'Created on', width: 120, renderer: renderCreatedDate}
];

Ext.define('CRM_WORKFLOW', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_WORKFLOW_FIELDS']
});


fields['CRM_MESSAGE_FIELDS'] = [
   {name: 'id', text: 'ID', width: 50, hidden:true},         
   {name: 'message_status', text: '#', width: 35, align: 'center', renderer: renderMessageStatus},
   {name: 'owner', text: 'To', width: 120, hidden: true, renderer:renderOwner},
   {name: '_from', text: 'From', width: 110},
   {name: 'subject', text: 'Subject', width: 120},
   {name: 'descr', text: 'Message', width: 350},
   {name: '_date', type: 'datetime', text: 'Created on', width: 120}
];

Ext.define('CRM_MESSAGE', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_MESSAGE_FIELDS']
});


fields['CRM_COMPLAIN_FIELDS'] = [
   {name: 'case_id', text: 'ID', width: 50, hidden:true}, 
   {name: 'complain_status', text: 'Status', width: 65, align: 'center', renderer: renderComplainStatus},   
   {name: 'complain_reason', text: 'Case Reason', width: 200, primary: true, renderer: renderTopicName},   
   {name: 'phone', text: 'Phone', align: 'center', width: 65},
   {name: 'crm_id', text: 'CRM ID', hidden: true, width: 80},
   {name: 'crm_name', text: 'Customer', width: 200, renderer: renderCRMName},
   {name: 'case_stage', text: 'Stage', width: 70, renderer: renderCaseLevel},
   {name: 'complain_origin', text: 'Origin', width: 65, align: 'center'},   
   {name: 'complain_type', text: 'Type', width: 100, align: 'center'},
   {name: 'calltype', text: 'Direction', align: 'center', width: 65},
   {name: 'call_from', text: 'Call center', align: 'center', width: 70},
   {name: 'priority', text: 'Priority', width: 60, align: 'center'},
   {name: 'descr', text: 'Description', width: 200, hidden: true},
   {name: 'owner', text: 'Owner', width: 110, renderer:renderOwner},   
   {name: 'userCode', text: 'Created by', width: 100, hidden: true},
   {name: 'resolution_type', text: 'Resolution type', width: 120, hidden: true},
   {name: 'resolution', text: 'Resolution', width: 220, hidden: true},
   {name: 'closing_date', text: 'Close date', dateFormat: 'Y-m-d', width: 80},
   {name: '_date', text: 'Created on', dateFormat: 'Y-m-d', width: 120, renderer: renderCreatedDate},
   {name: 'groupId', text: 'Case ID', width: 100},
   {name: 'notify', text: 'Notify', hidden: true}
];

Ext.define('CRM_COMPLAIN', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_COMPLAIN_FIELDS']
});

fields['CRM_NOTES_FIELDS'] = [
   {name: 'id', text: 'ID', width: 50, hidden:true}, 
   {name: 'crm_id', text: 'CRM ID', width: 50, hidden: true},   
   {name: 'deal_id', text: 'Deal ID', width: 50, hidden: true},   
   {name: 'case_id', text: 'Case ID', width: 50, hidden: true}, 
   {name: 'crm_name', text: 'Customer', width: 200, renderer: renderCRMName},
   {name: 'deal_name', text: 'Topic Name', width: 200, renderer: renderDealName},
   {name: 'descr', text: 'Note', width: 200, primary: true},
   {name: 'www', text: 'Attach link', width: 150, renderer: renderLink},
   {name: 'owner', text: 'Owner', width: 100, renderer: renderOwner, hidden: true},
   {name: 'userCode', text: 'Created by', width: 100, renderer: renderOwner},
   {name: '_date', text: 'Created on', dateFormat: 'Y-m-d', width: 120, renderer: renderCreatedDate}
];

Ext.define('CRM_NOTES', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_NOTES_FIELDS']
});

fields['CRM_POSTS_FIELDS'] = [
   {name: 'id', text: 'ID', width: 50, hidden:true}, 
   {name: 'deal_id', text: 'Deal ID', width: 50, hidden: true},   
   {name: 'case_id', text: 'Case ID', width: 50, hidden: true},
   {name: 'message', text: 'Note', width: 200, primary: true},
   {name: 'level', type: 'int', text: 'level', width: 50, hidden: true},
   {name: 'owner', text: 'Owner', width: 100, renderer: renderOwner},
   {name: 'userCode', text: 'Created by', width: 100, hidden: true},
   {name: '_date', text: 'Created on', dateFormat: 'Y-m-d', width: 120, renderer: renderCreatedDate}
];

Ext.define('CRM_POSTS', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_POSTS_FIELDS']
});

fields['CRM_EMAIL_FIELDS'] = [
   {name: 'id', text: 'ID', width: 50, hidden:true}, 
   {name: 'crm_id', text: 'CRM ID', width: 50, hidden: true},   
   {name: 'deal_id', text: 'Deal ID', width: 50, hidden: true},   
   {name: 'case_id', text: 'Case ID', width: 50, hidden: true},   
   {name: 'deal_name', text: 'Topic Name', width: 180, renderer: renderDealName},
   {name: 'crm_name', text: 'Customer', width: 200, renderer: renderCRMName},
   {name: 'priority', text: 'Priority', width: 70, align: 'center', renderer: renderPriority},
   {name: 'email_status', text: 'Status', width: 70, align: 'center'},
   {name: 'subject', text: 'Subject', width: 200, primary: true},
   {name: '_to', text: 'To', width: 150, renderer: renderMail},
   {name: '_from', text: 'From', width: 150, renderer: renderMail, hidden: true},
   {name: 'campaign', text: 'Campaign', width: 150},
   {name: 'descr', text: 'Message body', width: 200, hidden: true},
   {name: 'owner', text: 'Owner', width: 100, renderer: renderOwner},
   {name: 'userCode', text: 'Created by', width: 100, hidden: true},
   {name: '_date', text: 'Created on', dateFormat: 'Y-m-d', width: 120, renderer: renderCreatedDate}
];

Ext.define('CRM_EMAIL', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_EMAIL_FIELDS']
});


fields['CRM_QUOTE_FIELDS'] = [
   {name: 'id', text: 'ID', width: 50, hidden:true}, 
   {name: 'quote_status', text: 'Status', width: 85, align: 'center', renderer: renderQuoteStatus}, 
   {name: 'quote_code', text: 'Quote ID', hidden: true, width: 110, align: 'center'}, 
   {name: 'crm_id', text: 'CRM ID', width: 80, hidden: true},
   {name: 'deal_id', text: 'DEAL ID', width: 80, hidden: true},
   {name: 'deal_name', text: 'Deal Name', width: 200, renderer: renderDealName},
   {name: 'crm_name', text: 'Potential Customer', width: 250, renderer: renderCRMName},
   {name: 'qty', text: 'Qty', align: 'right', width: 55, type: 'float', renderer: renderNumber, summaryRenderer: renderTNumber, summaryType: 'sum'},
   {name: 'amount', text: 'Total Amount', align: 'right', type: 'float', width: 110, renderer: renderMoney, summaryRenderer: renderTMoney, summaryType: 'sum'},
   {name: 'owner', text: 'Owner', width: 110, renderer:renderOwner}, 
   {name: 'descr', text: 'Description', width: 200, hidden: true},
   {name: 'userCode', text: 'Created by', width: 100, hidden: true},
   {name: '_date', text: 'Created on', dateFormat: 'Y-m-d', width: 120, renderer: renderCreatedDate}
];

Ext.define('CRM_QUOTE', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_QUOTE_FIELDS']
});

fields['CRM_QUOTE_DETAIL_FIELDS'] = [
   {name: 'id', text: 'ID', width: 50, hidden:true}, 
   {name: 'quote_id', text: 'Quote ID', hidden: true}, 
   {name: 'crm_id', text: 'CRM ID', hidden: true},
   {name: 'product_name', text: 'Product', width: 200}, 
   {name: 'qty', text: 'Qty', type:'float', align: 'right', width: 60, summaryType: 'sum', summaryRenderer: renderTNumber},
   {name: 'price', text: 'Price', width: 90, type: 'float', align: 'right', renderer: renderMoney},
   {name: 'amount', text: 'Amount (Discount)', type: 'float', width: 100, align: 'right', renderer: renderMoney, summaryRenderer: renderTMoney, summaryType: 'sum'}
];

Ext.define('CRM_QUOTE_DETAIL', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_QUOTE_DETAIL_FIELDS']
});

fields['CRM_DEAL_PRODUCTS_FIELDS'] = [
   {name: 'id', text: 'ID', width: 50, hidden:true}, 
   {name: 'deal_id', text: 'Deal ID', hidden: true},
   {name: 'crm_id', text: 'CRM ID', hidden: true},
   {name: 'product_name', text: 'Product name', width: 200}, 
   {name: 'precent',  type:'float', text: 'Precent', width: 100, align: 'right'}, 
   {name: 'qty', text: 'Qty', type:'float', align: 'right', width: 80, summaryType: 'sum'},
   {name: 'price', text: 'Price', width: 90, type: 'float', align: 'right', renderer: renderMoney},
   {name: 'amount', text: 'Amount (Discount)', type: 'float', width: 100, align: 'right', renderer: renderMoney, summaryRenderer: renderTMoney, summaryType: 'sum'},
   {name: '_date', text: 'Created on', dateFormat: 'Y-m-d', width: 120, renderer: renderCreatedDate}
];

Ext.define('CRM_DEAL_PRODUCTS', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_DEAL_PRODUCTS_FIELDS']
});


fields['CRM_DEAL_PAYROLL_FIELDS'] = [
   {name: 'id', text: 'ID', width: 50, hidden:true}, 
   {name: 'deal_id', text: 'Deal ID', hidden: true},
   {name: 'deal_name', text: 'Topic Name', width: 250, renderer: renderDealName},
   {name: 'pay_date', text: 'Date', width: 120, align: 'center'}, 
   {name: 'amount', text: 'Amount', type:'float', align: 'right', width: 120, summaryType: 'sum', renderer: renderMoney, summaryRenderer: renderTMoney},
   {name: 'userCode', text: 'Created by', width: 100, renderer: renderOwner},
   {name: '_date', text: 'Created on', dateFormat: 'Y-m-d', width: 120, renderer: renderCreatedDate}
];

Ext.define('CRM_DEAL_PAYROLL', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_DEAL_PAYROLL_FIELDS']
});


fields['CRM_SERVICE_PAYROLL_FIELDS'] = [
   {name: 'id', text: 'ID', width: 50, hidden:true}, 
   {name: 'service_id', text: 'Service ID', hidden: true},
   {name: 'service_name', text: 'Topic Name', width: 250, renderer: renderServiceName},
   {name: 'pay_date', text: 'Date', width: 120, align: 'center'}, 
   {name: 'amount', text: 'Amount', type:'float', align: 'right', width: 120, summaryType: 'sum', renderer: renderMoney, summaryRenderer: renderTMoney},
   {name: 'userCode', text: 'Created by', width: 100, renderer: renderOwner},
   {name: '_date', text: 'Created on', dateFormat: 'Y-m-d', width: 120, renderer: renderCreatedDate}
];

Ext.define('CRM_SERVICE_PAYROLL', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_SERVICE_PAYROLL_FIELDS']
});

fields['CRM_CASE_PRODUCTS_FIELDS'] = [
   {name: 'id', text: 'ID', width: 50, hidden:true}, 
   {name: 'case_id', text: 'Case ID', hidden: true},
   {name: 'product_name', text: 'Product name', width: 200}, 
   {name: 'contract', text: 'Contract', width: 120},
   {name: '_date', text: 'Created on', dateFormat: 'Y-m-d', width: 120}
];

Ext.define('CRM_CASE_PRODUCTS', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_CASE_PRODUCTS_FIELDS']
});

fields['CRM_CASE_TRANSFER_FIELDS'] = [
   {name: 'id', text: 'ID', width: 50, hidden:true}, 
   {name: 'case_id', text: 'Case ID', hidden: true},
   {name: 'descr', text: 'Note', width: 200, primary: true},
   {name: 'owner', text: 'Owner', width: 120, primary: true}, 
   {name: '_from', text: 'From', width: 120},
   {name: '_date', text: 'Created on', dateFormat: 'Y-m-d', width: 120, renderer: renderCreatedDate}
];

Ext.define('CRM_CASE_TRANSFER', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_CASE_TRANSFER_FIELDS']
});

fields['CRM_DEAL_TRANSFER_FIELDS'] = [
   {name: 'id', text: 'ID', width: 50, hidden:true}, 
   {name: 'deal_id', text: 'Deal ID', hidden: true},
   {name: 'descr', text: 'Note', width: 200, primary: true},
   {name: 'owner', text: 'Owner', width: 120, primary: true}, 
   {name: 'userCode', text: 'Created by', width: 120}, 
   {name: '_date', text: 'Created on', dateFormat: 'Y-m-d', width: 120, renderer: renderCreatedDate}
];

Ext.define('CRM_DEAL_TRANSFER', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_DEAL_TRANSFER_FIELDS']
});


fields['CRM_DEAL_SALES_TEAM_FIELDS'] = [
   {name: 'id', text: 'ID', width: 50, hidden:true}, 
   {name: 'deal_id', text: 'Deal ID', hidden: true},
   {name: 'crm_id', text: 'CRM ID', hidden: true},
   {name: 'deal_name', text: 'Topic Name', width: 200, renderer: renderDealName},
   {name: 'owner', text: 'Member', width: 150, renderer: renderOwner, primary: true}, 
   {name: 'precent', text: 'Precent', width: 70, renderer: renderPrecent, align: 'right'}, 
   {name: 'userCode', text: 'Created by', width: 100, hidden: true},
   {name: '_date', text: 'Created on', dateFormat: 'Y-m-d', width: 120, renderer: renderCreatedDate}
];

Ext.define('CRM_DEAL_SALES_TEAM', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_DEAL_SALES_TEAM_FIELDS']
});

fields['CRM_CUSTOMER_CAMPAIGN_FIELDS'] = [
   {name: 'id', text: 'ID', width: 50, hidden:true}, 
   {name: 'crm_id', text: 'CRM ID', hidden: true},
   {name: 'crm_name', text: 'Potential Customer', width: 250, renderer: renderCRMName},
   {name: 'campaign', text: 'Campaign', width: 200},
   {name: 'userCode', text: 'Created by', width: 100},
   {name: '_date', text: 'Created on', dateFormat: 'Y-m-d', width: 140, renderer: renderCreatedDate}
];

Ext.define('CRM_CUSTOMER_CAMPAIGN', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_CUSTOMER_CAMPAIGN_FIELDS']
});

fields['CRM_CUSTOMER_COMPANY_FIELDS'] = [
   {name: 'id', text: 'ID', width: 50, hidden:true}, 
   {name: 'crm_id', text: 'CRM ID', hidden: true},
   {name: 'crm_name', text: 'Potential Customer', width: 250, renderer: renderCRMName},
   {name: 'company', text: 'Company', width: 200},
   {name: 'userCode', text: 'Created by', width: 100},
   {name: '_date', text: 'Created on', dateFormat: 'Y-m-d', width: 140, renderer: renderCreatedDate}
];

Ext.define('CRM_CUSTOMER_COMPANY', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_CUSTOMER_COMPANY_FIELDS']
});


fields['CRM_DEAL_COMPETITORS_FIELDS'] = [
   {name: 'id', text: 'ID', width: 50, hidden:true}, 
   {name: 'deal_id', text: 'Deal ID', hidden: true}, 
   {name: 'crm_id', text: 'CRM ID', hidden: true},
   {name: 'competitor_name', text: 'Competitor name', width: 200, primary: true}, 
   {name: 'www', text: 'Web site', width: 140, renderer: renderWWW},
   {name: 'reported_revenue', text: 'Reported revenue', width: 120, type: 'float', align: 'right', renderer: renderMoney},
   {name: 'strength', text: 'Strength', width: 120},
   {name: 'weakness', text: 'Weakness', width: 120}
];

Ext.define('CRM_DEAL_COMPETITORS', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_DEAL_COMPETITORS_FIELDS']
});

fields['CRM_SALES_FIELDS'] = [
   {name: 'id', text: 'ID', width: 50, hidden:true}, 
   {name: 'contract_no', text: 'Contract №', width: 80, align: 'center'}, 
   {name: 'crm_id', text: 'CRM ID', width: 80, hidden: true},
   {name: 'deal_id', text: 'DEAL ID', width: 80, hidden: true},
   {name: 'crm_name', text: 'Customer', width: 210, renderer: renderCRMName},
   {name: 'deal_name', text: 'Deal Name', width: 210, renderer: renderDealName},
   {name: 'product_name', text: 'Product name', width: 280}, 
   {name: 'quote_code', text: 'Quote ID', hidden: true, width: 110, align: 'center'},    
   {name: 'start_date', type: 'datetime', dateFormat: 'Y-m-d', text: 'Start date', width: 80, align: 'center'}, 
   {name: 'end_date', type: 'datetime', dateFormat: 'Y-m-d', text: 'End date', width: 80, align: 'center'}, 
   {name: 'qty', text: 'Qty',  align: 'right', width: 55, type: 'float', renderer: renderNumber, summaryRenderer: renderTNumber, summaryType: 'sum'},
   {name: 'price', text: 'Price', align: 'right', type: 'float', width: 110, renderer: renderMoney},
   {name: 'amount', text: 'Amount', align: 'right', type: 'float', width: 110, renderer: renderMoney, summaryRenderer: renderTMoney, summaryType: 'sum'},
   {name: 'campaign', text: 'Campaign', width: 150},
   {name: 'owner', text: 'Owner', width: 110, renderer:renderOwner}, 
   {name: 'status', text: 'Status', width: 100, hidden: true},
   {name: 'userCode', text: 'Created by', width: 100, hidden: true},
   {name: '_date', type: 'datetime', dateFormat: 'Y-m-d', text: 'Created on', width: 120, renderer: renderCreatedDate}
];

Ext.define('CRM_SALES', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_SALES_FIELDS']
});

fields['CRM_PRODUCT_FIELDS'] = [
   {name: 'product_id', text: 'ID', width: 50, hidden:true}, 
   {name: 'product_name', text: 'Name', width: 250, primary: true}, 
   {name: 'product_type', text: 'Type', width: 120},
   {name: 'price', text: 'Price', type: 'float', width: 90, renderer: renderMoney, align: 'right'},
   {name: 'unit_type', text: 'Unit type', width: 60, hidden: true},
   {name: 'unit_size', text: 'Unit size', type: 'float', width: 60, hidden: true},
   {name: 'company', text: 'Company', width: 120}
];

Ext.define('CRM_PRODUCT', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_PRODUCT_FIELDS']
});

fields['CRM_WAREHOUSE_FIELDS'] = [
   {name: 'warehouse_id', text: 'ID', width: 50, hidden:true}, 
   {name: 'name', text: 'Name', width: 150, primary: true}, 
   {name: 'location', text: 'Location', width: 120},
   {name: 'capacity', text: 'Capacity', type: 'float', width: 90, renderer: renderNumber, align: 'right'},
   {name: 'descr', text: 'Description', width: 120},
   {name: 'owner', text: 'Owner', width: 110, renderer:renderOwner}, 
   {name: 'warehouse_type', text: 'Type', width: 80},
   {name: '_date', type: 'datetime', dateFormat: 'Y-m-d', text: 'Created on', width: 120, renderer: renderCreatedDate}
];

Ext.define('CRM_WAREHOUSE', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_WAREHOUSE_FIELDS']
});


fields['CRM_STORAGE_FIELDS'] = [
   {name: 'id', text: 'ID', width: 50, hidden:true}, 
   {name: 'warehouse_id', text: 'ID', width: 50, hidden:true}, 
   {name: 'product_id', text: 'Product ID', width: 50, primary: true, hidden:true}, 
   {name: 'product_name', text: 'Product name', width: 200, summaryType: 'count', summaryRenderer: renderTNumber},
   {name: 'qty', text: 'Qty', type: 'float', width: 90, renderer: renderNumber, align: 'right', summaryType: 'sum', summaryRenderer: renderTNumber},
   {name: 'pty', text: 'Pty', type: 'float', width: 90, renderer: renderNumber, align: 'right', summaryType: 'sum', summaryRenderer: renderTNumber},
   {name: 'price', text: 'Price', width: 120, renderer:renderMoney, hidden: true},
   {name: 'amount', text: 'Amount', width: 110, renderer:renderMoney, hidden: true}, 
   {name: 'warehouse_name', text: 'Ware house', width: 150}, 
   {name: 'descr', text: 'Description', width: 120, hidden: true},
   {name: '_date', type: 'datetime', dateFormat: 'Y-m-d', text: 'Created on', width: 120, renderer: renderCreatedDate}
];

Ext.define('CRM_STORAGE', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_STORAGE_FIELDS']
});

fields['CRM_STAT_FIELDS'] = [
   {name: 'id', text: 'id', hidden: true}, 
   {name: 'owner', text: 'Owner', width: 120}, 
   {name: 'team', text: 'Team', width: 150}, 
   {name: '_year', type: 'int', text: 'Year', width: 50, primary: true, align: 'center'}, 
   {name: '_month', type: 'int', text: 'Month', width: 50, primary: true, align: 'center'}, 
   {name: 'event_p', type: 'int', text: 'Appointment', width: 90, align: 'right'},
   {name: 'quote_p', type: 'int', text: 'Quote', width: 90, align: 'right'},
   {name: 'newcus_p', type: 'int', text: 'New Customer', width: 90, align: 'right'},
   {name: 'expat_p', type: 'int', text: 'Expat Customer', width: 90, align: 'right'},
   {name: 'vip_p', type: 'int', text: 'VIP customer', width: 90, align: 'right'},
   {name: 'extend_p', type: 'int', text: 'Extension', width: 90, align: 'right'},
   {name: 'userCode', text: 'Created by', width: 100, hidden: true},
   {name: '_date', type: 'datetime', dateFormat: 'Y-m-d', text: 'Created on', hidden: true, width: 120, renderer: renderCreatedDate}
];

Ext.define('CRM_STAT', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_STAT_FIELDS']
});


fields['CRM_USERS_FIELDS'] = [
   {name: 'id', text: 'ID', width: 50, hidden:true}, 
   {name: 'owner', text: 'User name', width: 130, primary: true}, 
   {name: 'password', text: 'Password', width: 90, hidden: true, renderer: renderPassword, primary: true},
   {name: 'fullName', text: 'Full name', width: 120},
   {name: 'section', text: 'Section', width: 150},
   {name: 'team', text: 'Team', width: 150},
   {name: 'position', text: 'Position', width: 150},
   {name: 'company', text: 'Company', width: 150},
   {name: 'gmailAccount', text: 'Goolge Account', width: 120},
   {name: 'user_type', text: 'Direction', width: 100, hidden: true},
   {name: 'user_level', text: 'Level', width: 80, renderer: renderUserLevel},
   {name: 'permission', text: 'Permissions', width: 250, hidden: true}   
];

Ext.define('CRM_USERS', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_USERS_FIELDS']
});

fields['CRM_COMPETITOR_FIELDS'] = [
   {name: 'id', text: 'ID', width: 50, hidden:true}, 
   {name: 'competitor_name', text: 'Competitor name', width: 120},
   {name: 'www', text: 'Web site', width: 150},
   {name: 'userCode', text: 'Create by', width: 100, hidden: true},
   {name: '_date', type: 'datetime', dateFormat: 'Y-m-d', text: 'Created on', width: 120, renderer: renderCreatedDate}
];

Ext.define('CRM_COMPETITOR', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_COMPETITOR_FIELDS']
});

fields['CRM_COMMISSION_FIELDS'] = [
   {name: 'id', text: 'ID', width: 50, hidden:true}, 
   {name: 'crm_id', text: '', hidden: true},
   {name: 'deal_id', text: '', hidden: true},
   {name: 'crm_name', text: 'Contact', flex: 1, renderer: renderCRMName},
   {name: 'amount', type: 'float', text: 'Amount', width: 150},
   {name: 'descr', text: 'Description', width: 200, hidden: true},
   {name: 'userCode', text: 'Create by', width: 100, hidden: true},
   {name: '_date', type: 'datetime', dateFormat: 'Y-m-d', text: 'Created on', width: 120, renderer: renderCreatedDate}
];

Ext.define('CRM_COMMISSION', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_COMMISSION_FIELDS']
});

fields['CRM_USERS_GROUP_FIELDS'] = [
   {name: 'id', text: 'ID', width: 50, hidden:true}, 
   {name: 'owner', text: 'Member', width: 120, primary: true},
   {name: 'groupName', text: 'Group name', width: 150},
   {name: '_date', text: 'Created on', dateFormat: 'Y-m-d', width: 120}
];

Ext.define('CRM_USERS_GROUP', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_USERS_GROUP_FIELDS']
});

fields['CRM_ALARM_FIELDS'] = [
   {name: 'id', text: 'ID', width: 50, hidden:true}, 
   {name: 'crm_id', text: 'CRM ID', width: 150},
   {name: 'crm_name', text: 'Customer', width: 150},
   {name: 'subject', text: 'Description', width: 200},
   {name: 'status', text: 'Status', width: 100},
   {name: 'owner', text: 'Owner', width: 100},
   {name: 'type', text: 'Owner', width: 80}
];

Ext.define('CRM_ALARM', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_ALARM_FIELDS']
});

fields['CRM_RISK_RESULT_FIELDS'] = [
   {name: 'crm_id', text: 'ID', width: 20, hidden: true},   
   {name: 'crm_name', text: 'Potential Customer', width: 200, renderer: renderCRMName},
   {name: 'category', text: 'Category', width: 90},
   {name: 'section', text: 'Section', width: 120},
   {name: 'question', text: 'Question', width: 250},
   {name: 'score', text: 'Score', width: 60, align: 'center'},
   {name: '_repeat', text: 'Repeat', width: 60, align: 'center'},
   {name: 'status', text: 'Status', width: 60, align: 'center'},
   {name: 'owner', text: 'Create by', width: 100, hidden: true},
   {name: '_date', type: 'datetime', dateFormat: 'Y-m-d', text: 'Created on', width: 120, renderer: renderCreatedDate}
];

Ext.define('CRM_RISK_RESULT', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_RISK_RESULT_FIELDS']
});


fields['CRM_DEAL_FIELDS'] = [
   {name: 'deal_id', text: 'ID', width: 50, hidden:true}, 
   {name: 'status', text: 'Status', width: 80, align: 'center'},
   {name: 'deal', text: 'Topic Name', width: 250, primary: true, renderer: renderTopicName},   
   {name: 'deal_origin', text: 'Origin', primary: true},
   {name: 'stage', text: 'Stage', width: 85, align: 'center', renderer: renderDealLevel},
   {name: 'crm_id', text: 'CRM ID', hidden: true, width: 80},
   {name: 'crm_name', text: 'Potential customer', width: 200, renderer: renderCRMName},
   {name: 'phone', text: 'Phone', width: 80, hidden: true, primary: true},
   {name: 'probablity', text: 'Probablity', width: 70, type:'int', summaryType:'average', summaryRenderer:renderTPrecent, align: 'right', renderer: renderPrecent},
   {name: 'expected_revenue', text: 'Expected revenue', type:'float', width: 120, align: 'right', summaryType:'sum', summaryRenderer: renderTMoney, renderer: renderMoney},
   {name: '_date', text: 'Created on', width: 120, renderer: renderCreatedDate},
   {name: 'closing_date', text: 'Close date', dateFormat: 'Y-m-d', width: 85, align: 'center'},   
   {name: 'remind_date', text: 'Remind date', dateFormat: 'Y-m-d', width: 85, align: 'center', renderer: renderDate},   
   {name: 'current_situation', text: 'Current situation', width: 200, hidden: true},
   {name: 'customer_need', text: 'Customer need', width: 200, hidden: true},
   {name: 'proposed_solution', text: 'Proposed solution', width: 200, hidden: true},
   {name: 'descr', text: 'Description', width: 200, hidden: true},
   {name: 'owner', text: 'Owner', width: 130, renderer: renderOwner},
   {name: 'competitor_name', text: 'Competitor', width: 200},
   {name: 'campaign', text: 'Campaign', width: 200},   
   {name: 'company', text: 'Company', width: 200},
   {name: 'userCode', text: 'Created by', width: 80, hidden: true},
   {name: 'notify', text: 'Notify', hidden: true}
];


Ext.define('CRM_DEAL', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_DEAL_FIELDS']
});


fields['CRM_SERVICE_FIELDS'] = [
   {name: 'service_id', text: 'ID', width: 50, hidden:true}, 
   {name: 'subject', text: 'Topic Name', width: 250, primary: true, renderer: renderTopicName},   
   {name: 'service_stage', text: 'Stage', width: 85, align: 'center', renderer: renderDealLevel},
   {name: 'crm_id', text: 'CRM ID', hidden: true, width: 80},
   {name: 'crm_name', text: 'Potential customer', width: 200, renderer: renderCRMName},
   {name: 'phone', text: 'Phone', width: 80, hidden: true, primary: true},
   {name: 'service_revenue', text: 'Revenue', type:'float', width: 120, align: 'right', summaryType:'sum', summaryRenderer: renderTMoney, renderer: renderMoney},
   {name: '_date', text: 'Created on', width: 120, renderer: renderCreatedDate},
   {name: 'closing_date', text: 'Close date', dateFormat: 'Y-m-d', width: 120, align: 'center'},   
   {name: 'remind_date', text: 'Remind date', dateFormat: 'Y-m-d', width: 85, align: 'center', renderer: renderDate}, 
   {name: 'descr', text: 'Description', width: 200, hidden: true},
   {name: 'owner', text: 'Owner', width: 130, renderer: renderOwner},
   {name: 'campaign', text: 'Campaign', width: 200},   
   {name: 'userCode', text: 'Created by', width: 80, hidden: true}
];

Ext.define('CRM_SERVICE', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_SERVICE_FIELDS']
});


fields['CRM_RESELLER_FIELDS'] = [
   {name: 'deal_id', text: 'ID', width: 50, hidden:true}, 
   {name: 'status', text: 'Status', width: 80, align: 'center'},
   {name: 'deal', text: 'Topic Name', width: 250, primary: true, renderer: renderTopicName},
   {name: 'crm_id', text: 'CRM ID', hidden: true, width: 80},
   {name: 'crm_name', text: 'Potential customer', width: 250, renderer: renderCRMName},
   {name: 'expected_revenue', text: 'Expected revenue', type:'float', width: 120, align: 'right', summaryType:'sum', summaryRenderer: renderTMoney, renderer: renderMoney},
   {name: 'closing_date', text: 'Close date', dateFormat: 'Y-m-d', width: 85, align: 'center'},   
   {name: '_date', text: 'Created on', width: 120, renderer: renderCreatedDate},
   {name: 'descr', text: 'Description', width: 200, hidden: true},
   {name: 'owner', text: 'Owner', width: 130, renderer: renderOwner},
   {name: 'userCode', text: 'Created by', width: 80, hidden: true},
   {name: 'notify', text: 'Notify', hidden: true}
];

Ext.define('CRM_RESELLER', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_RESELLER_FIELDS']
});


fields['CRM_POTENTIAL_FIELDS'] = [
   {name: 'crm_id', text: 'CRM ID', hidden: true, width: 80},
   {name: 'crm_name', text: 'Customer', width: 150, renderer: renderCRMName},
   {name: 'closing_date', text: 'Closing date', width: 80, align: 'center'},
   {name: 'stage', text: 'Stage', width: 100},
   {name: 'probablity', text: 'Probablity', width: 60, align: 'right', renderer: renderPrecent},
   {name: 'next_step', text: 'Next Step',  width: 150},
   {name: 'amount', text: 'Amount', align: 'center', align: 'right', width: 80, renderer: renderMoney},
   {name: 'expected_revenue', text: 'Expected Revenue', align: 'right', width: 120, renderer: renderMoney},
   {name: '_date', text: 'Огноо', dateFormat: 'Y-m-d', hidden: true, width: 80, renderer: renderCreatedDate},
   {name: 'descr', text: 'Тайлбар', width: 200, hidden: true},
   {name: 'owner', text: 'Owner', width: 80, hidden: true, renderer:renderOwner},   
   {name: 'userCode', text: 'Created by', width: 80, hidden: true},
   {name: 'campaign', text: 'Campaign', width: 200},
   {name: 'deal_id', text: 'Deal ID', width: 50, hidden: true},
   {name: 'deal_name', text: 'Topic Name', width: 150, hidden: true}
];

Ext.define('CRM_POTENTIAL', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_POTENTIAL_FIELDS']
});

fields['CRM_CAMPAIGN_FIELDS'] = [
   {name: 'id', text: 'ID', width: 0, hidden: true},
   {name: 'campaign_status', text: 'Status', width: 70, align: 'center', renderer: renderCampaignStatus},
   {name: 'campaign', text: 'Campaign name', width: 200, primary: true},
   {name: 'total_members', type: 'int', text: 'Members', width: 70, align: 'right'},
   {name: 'campaign_live', text: 'Define', width: 60, align: 'center'},
   {name: 'campaign_type', text: 'Type', width: 80, primary: true},
   {name: 'personal', text: 'Personal view', width: 150, hidden: true},
   {name: 'product_name', text: 'Product name', width: 150},
   {name: 'expected_revenue', text: 'Expected Revenue', type: 'float', width: 120, summaryType: 'sum', align: 'right', renderer: renderMoney, summaryRenderer: renderTMoney},
   {name: 'budgeted_cost', text: 'Budgeted cost', type: 'float', align: 'center', align: 'right', hidden: true, width: 110, summaryType: 'sum', renderer: renderMoney, summaryRenderer: renderTMoney},
   {name: 'start_date', text: 'Start date', dateFormat: 'Y-m-d', align: 'center', width: 75},
   {name: 'end_date', text: 'End date', dateFormat: 'Y-m-d', align: 'center', width: 75},
   {name: 'owner', text: 'Owner', width: 100, renderer:renderOwner},   
   {name: '_date', text: 'Created on', dateFormat: 'Y-m-d', width: 120, renderer: renderCreatedDate},
   {name: 'descr', text: 'Description', width: 250, hidden: true},
   {name: 'userCode', text: 'Created by', width: 80, hidden: true}
];

Ext.define('CRM_CAMPAIGN', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_CAMPAIGN_FIELDS']
});


fields['CRM_USER_PLANNING_FIELDS'] = [
   {name: 'id', text: 'ID', width: 50, hidden:true}, 
   {name: 'owner', text: 'Owner', width: 150}, 
   {name: 'team', text: 'Team', width: 150}, 
   {name: 'start_date', text: 'Start date', dateFormat: 'Y-m-d', width: 80},
   {name: 'end_date', text: 'End date', dateFormat: 'Y-m-d',width: 80},
   {name: 'amountTheshold', text: 'Target', type: 'float', width: 120, renderer: renderMoney, align: 'right'},
   {name: 'userCode', text: 'Created By', width: 100, renderer:renderOwner},   
   {name: '_date', text: 'Created on', dateFormat: 'Y-m-d', width: 120, hidden: true}
];

Ext.define('CRM_USER_PLANNING', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_USER_PLANNING_FIELDS']
});


fields['CRM_PERSONAL_VIEW_FIELDS'] = [
   {name: 'id', text: 'ID', width: 50, hidden: true}, 
   {name: 'personal', text: 'View name', width: 200}, 
   {name: 'field', text: 'Field', width: 100}, 
   {name: 'equals', text: 'IF', width: 100}, 
   {name: 'value', text: 'Value', width: 190},
   {name: '_date', text: 'Created on', dateFormat: 'Y-m-d', hidden: true, width: 80},
   {name: 'userCode', text: 'Created by', width: 120, hidden: true}
];

Ext.define('CRM_PERSONAL_VIEW', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_PERSONAL_VIEW_FIELDS']
});

fields['CRM_REPORT_ANY_FIELDS'] = [
   {name: 'crm_name', text: '', hidden: true}, 
];

Ext.define('CRM_REPORT_ANY', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_REPORT_ANY_FIELDS']
});

fields['CRM_REPORT_FIELDS'] = [
   {name: 'crm_name', text: 'Potientail customer', width: 250, summaryType: 'count', summaryRenderer: renderTReportNumber}, 
   {name: 'product_name', text: 'Product name', width: 250}, 
   {name: 'stage', text: 'Stage', width: 85, align: 'center', renderer: renderDealLevel},
   {name: 'expected_revenue', align: 'right', type:'float', text: 'Expected revenue', width: 150, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney}, 
   {name: 'probablity', text: 'Probablity', type:'int',  width: 80, align: 'center', renderer: renderPrecent, summaryType: 'average', summaryRenderer: renderTPrecent},
   {name: 'descr', text: 'Description', width: 250},
   {name: 'owner', text: 'Owner', width: 160}
];

Ext.define('CRM_REPORT', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_REPORT_FIELDS']
});


fields['CRM_REPORT_PRODUCT_FIELDS'] = [
   {name: 'product_name', text: 'Product name', width: 250}, 
   {name: 'qty', text: 'Qty', type: 'float', width: 85, align: 'right', renderer: renderNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
   {name: 'amount', align: 'right', type:'float', text: 'Amount', width: 150, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney}, 
   {name: 'precent', hidden: true, text: 'Precent', type:'float',  width: 80, align: 'center', renderer: renderPrecent, summaryType: 'average', summaryRenderer: renderTPrecent}
];

Ext.define('CRM_REPORT_PRODUCT', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_REPORT_PRODUCT_FIELDS']
});

fields['CRM_CAMPAIGN_RESULT_FIELDS'] = [
   {name: 'owner', text: 'Owner', width: 120}, 
   {name: 'team', text: 'Team', width: 120, hidden: true}, 
   {name: 'pending', text: 'Pending', type:'int', width: 60, align: 'center', renderer: renderENumber, summaryType: 'sum', summaryRenderer: renderTNumber}, 
   {name: 'remind', text: 'Remind', type:'int', width: 60, align: 'center', renderer: renderENumber, summaryType: 'sum', summaryRenderer: renderTNumber},
   {name: 'success', text: 'Success', type:'int', width: 60, align: 'center', renderer: renderENumber, summaryType: 'sum', summaryRenderer: renderTNumber},
   {name: 'total', text: 'Total', type:'int', width: 70, align: 'center', renderer: renderENumber, summaryType: 'sum', summaryRenderer: renderTNumber},
   {name: 'performance', text: 'Performance', type:'float', width: 70, align: 'center', renderer: renderPrecent, summaryType: 'average', summaryRenderer: renderTPrecent}  
];

Ext.define('CRM_CAMPAIGN_RESULT', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_CAMPAIGN_RESULT_FIELDS']
});


fields['CRM_REPORT_REVENUE_FIELDS'] = [
   {name: 'owner', text: 'Owner', width: 250}, 
   {name: 'team', text: 'Team', width: 250}, 
   {name: 'actual_revenue', text: 'Actual revenue', type:'float', width: 150, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney}, 
   {name: 'expected_revenue', text: 'Expected revenue', type:'float', width: 150, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'target_revenue', text: 'Target revenue', type:'float', width: 150, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'perform', text: 'Performance', type:'float', width: 100, align: 'right', renderer: renderPrecent, summaryType: 'average', summaryRenderer: renderTPrecent}  
];

Ext.define('CRM_REPORT_REVENUE', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_REPORT_REVENUE_FIELDS']
});

fields['CRM_REPORT_RESELLER_FIELDS'] = [
   {name: 'crm_name', text: 'Reseller name', width: 250, summaryType: 'count', summaryRenderer: renderTReportNumber}, 
   {name: 'owner', text: 'Owner', width: 130}, 
   {name: 'meeting', text: 'Meeting', type:'int', align: 'center', width: 90}, 
   {name: 'phonecall', text: 'Call', type:'int', width: 90, align: 'center'},
   {name: 'email', text: 'Email', type:'int', width: 90, align: 'center'},
   {name: 'p1_qty', type:'int'},
   {name: 'p1_amount', type:'float'},
   {name: 'p2_qty', type:'int'},
   {name: 'p2_amount', type:'float'},
   {name: 'p3_qty', type:'int'},
   {name: 'p3_amount', type:'float'},
   {name: 'p4_qty', type:'int'},
   {name: 'p4_amount', type:'float'},
   {name: 'p5_qty', type:'int'},
   {name: 'p5_amount', type:'float'},
   {name: 'total_amount', text: 'Amount', type:'float', width: 120, align: 'right', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney},
   {name: 'total_qty', text: 'Qty', type:'int', align: 'right', width: 80, summaryType: 'sum', summaryRenderer: renderTNumber}
];

Ext.define('CRM_REPORT_RESELLER', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_REPORT_RESELLER_FIELDS']
});

fields['CRM_REPORT_DIRECT_SALES_FIELDS'] = [
   {name: 'owner', text: 'Owner', width: 250}, 
   {name: 'section', text: 'Section', width: 150}, 
   {name: 'c_p', type:'int', text: 'Pending', align: 'center', width: 60}, 
   {name: 'c_r', type:'int', text: 'Remind', align: 'center', width: 60}, 
   {name: 'c_s', type:'int', text: 'Success', align: 'center', width: 90}, 
   {name: 'a_m', type:'int', text: 'Meeting', align: 'center', width: 90}, 
   {name: 'a_p', type:'int', text: 'Phone call', align: 'center', width: 90}, 
   {name: 'a_e', type:'int', text: 'Email', align: 'center', width: 90}, 
   {name: 'd_l', type:'int', text: 'Meeting', align: 'center', width: 90}, 
   {name: 'd_o', type:'int', text: 'Phone call', align: 'center', width: 90}, 
   {name: 'd_q', type:'int', text: 'Email', align: 'center', width: 90}, 
   {name: 'd_c', type:'int', text: 'Email', align: 'center', width: 90}, 
   {name: 'total_qty', type:'int', text: 'Qty', align: 'center', width: 90}, 
   {name: 'total_amount', type:'int', text: 'Amount', align: 'center', width: 90}
];

Ext.define('CRM_REPORT_DIRECT_SALES', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_REPORT_DIRECT_SALES_FIELDS']
});

columns['CRM_REPORT_DIRECT_SALES_COLUMNS'] = [
   {dataIndex: 'owner', text: 'Owner', width: 150}, 
   {dataIndex: 'section', text: 'Team', width: 150}, 
   {
	   text: 'Campaign',
	   columns: [{dataIndex:'c_p', text: 'Pending', width: 90, align: 'center', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'c_r', text: 'Remind', width: 90, align: 'center', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'c_s', text: 'Success', width: 90, align: 'center', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber}]
   },
   {
	   text: 'Activity',
	   columns: [{dataIndex:'a_m', text: 'Meting', width: 90, align: 'center', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'a_p', text: 'Phone call', width: 90, align: 'center', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'a_e', text: 'Email', width: 90, align: 'center', renderer: renderPrecent}]
   },
   {
	   text: 'Deal',
	   columns: [{dataIndex:'d_l', text: 'Lead', width: 70, align: 'center', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'d_o', text: 'Opportunity', width: 70, align: 'center', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'d_q', text: 'Quote', width: 70, align: 'center', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'d_c', text: 'Closed', width: 70, align: 'center', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber}]
   },
   {
	   text: 'Total',
	   columns: [{dataIndex:'total_qty', text: 'Qty', width: 90, align: 'center', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'total_amount', text: 'Amount', width: 120, align: 'center', renderer: renderMoney, summaryType: 'sum', summaryRenderer: renderTMoney}]
   }
];


fields['CRM_REPORT_CASE_FIELDS'] = [
   {name: 'owner', text: 'Owner', width: 250}, 
   {name: 'section', text: 'Section', width: 150}, 
   {name: 'c1', type:'int', text: 'Pending', align: 'center', width: 60}, 
   {name: 'c2', type:'int', text: 'Remind', align: 'center', width: 60}, 
   {name: 'c3', type:'int', text: 'Success', align: 'center', width: 90}, 
   {name: 'c4', type:'int', text: 'Success', align: 'center', width: 90}, 
   {name: 'c5', type:'int', text: 'Success', align: 'center', width: 90}, 
   {name: 'c6', type:'int', text: 'Success', align: 'center', width: 90}, 
   {name: 'c7', type:'int', text: 'Success', align: 'center', width: 90}, 
   {name: 'p1', type:'int', text: 'Meeting', align: 'center', width: 90}, 
   {name: 'p2', type:'int', text: 'Phone call', align: 'center', width: 90}, 
   {name: 'p3', type:'int', text: 'Email', align: 'center', width: 90}, 
   {name: 's1', type:'int', text: 'Qty', align: 'center', width: 90}, 
   {name: 's2', type:'int', text: 'Amount', align: 'center', width: 90},
   {name: 's3', type:'int', text: 'Amount', align: 'center', width: 90},
   {name: 'd1', type:'int', text: 'Amount', align: 'center', width: 90},
   {name: 'd2', type:'int', text: 'Amount', align: 'center', width: 90},
   {name: 'e1', type:'int', text: 'Amount', align: 'center', width: 90},
   {name: 'e2', type:'int', text: 'Amount', align: 'center', width: 90},
   {name: 't1', type:'int', text: 'Amount', align: 'center', width: 90},
   {name: 't2', type:'int', text: 'Amount', align: 'center', width: 90}
];

Ext.define('CRM_REPORT_CASE', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_REPORT_CASE_FIELDS']
});

columns['CRM_REPORT_CASE_COLUMNS'] = [
   {dataIndex: 'owner', text: 'Owner', width: 150}, 
   {dataIndex: 'section', text: 'Team', width: 150}, 
   {
	   text: 'Дуудлагын төрөл',
	   columns: [{dataIndex:'c1', text: 'Дуудлагын бүртгэл', width: 120, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'c2', text: 'Мэдээлэл хүссэн хүмүүсийн бүртгэл', width: 120, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'c3', text: 'Санал гомдлын бүртгэл', width: 120, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'c4', text: 'Мэдээлэл хүргүүлсэн бүртгэл', width: 120, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'c6', text: 'Problem solved', width: 120, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'c7', text: 'Information provided', width: 120, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'c5', text: 'Бусад', width: 60, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber}
				]
   },
   {
	   text: 'Priority',
	   columns: [{dataIndex:'p1', text: 'Low', width: 50, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'p2', text: 'Medium', width: 60, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'p3', text: 'High', width: 50, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber}]
   },
   {
	   text: 'Stage',
	   columns: [{dataIndex:'s1', text: 'Identify', width: 70, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'s2', text: 'Research', width: 70, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'s3', text: 'Resolve', width: 70, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber}]
   },
   {
	   text: 'Direction',
	   columns: [{dataIndex:'d1', text: 'Inbound', width: 70, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'d2', text: 'Outbound', width: 70, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber}]
   },
   {
	   text: 'Call center',
	   columns: [{dataIndex:'e1', text: '94097007', width: 70, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'e2', text: '70107007', width: 70, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber}]
   },
   {
	   text: 'Transfer',
	   columns: [{dataIndex:'t1', text: 'sukh@mandal', width: 80, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'t2', text: 'myagmartseren@madal', width: 80, align: 'center', renderer: renderIntNumber, summaryType: 'sum', summaryRenderer: renderTNumber}]
   }
];


fields['CRM_REPORT_ACTIVITY_FIELDS'] = [
   {name: 'owner', text: 'Owner', width: 250}, 
   {name: 'section', text: 'Section', width: 150}, 
   {name: 'call_p', text: 'Phone call', align: 'center', width: 60}, 
   {name: 'email_p', text: 'Email', align: 'center', width: 60}, 
   {name: 'meeting_p', text: 'Plan', align: 'center', width: 90}, 
   {name: 'meeting_q', text: 'Success', align: 'center', width: 90}, 
   {name: 'meeting_t', text: '%', align: 'center', width: 90}, 
   {name: 'quote_p', text: 'Plan', align: 'center', width: 90}, 
   {name: 'quote_q', text: 'Success', align: 'center', width: 90}, 
   {name: 'quote_t', text: '%', align: 'center', width: 90}, 
   {name: 'newcus_p', text: 'Plan', align: 'center', width: 90}, 
   {name: 'newcus_q', text: 'Success', align: 'center', width: 90}, 
   {name: 'newcus_t', text: '%', align: 'center', width: 90}, 
   {name: 'expat_p', text: 'Plan', align: 'center', width: 90}, 
   {name: 'expat_q', text: 'Success', align: 'center', width: 90}, 
   {name: 'expat_t', text: '%', align: 'center', width: 90}, 
   {name: 'vip_p', text: 'Plan', align: 'center', width: 90}, 
   {name: 'vip_q', text: 'Success', align: 'center', width: 90},
   {name: 'vip_t', text: '%', align: 'center', width: 90},
   {name: 'ext_p', text: 'Plan', align: 'center', width: 90}, 
   {name: 'ext_q', text: 'Success', align: 'center', width: 90},
   {name: 'ext_t', text: '%', align: 'center', width: 90}   
];

Ext.define('CRM_REPORT_ACTIVITY', {
	extend: 'Ext.data.Model',
	fields: fields['CRM_REPORT_ACTIVITY_FIELDS']
});

columns['CRM_REPORT_ACTIVITY_COLUMNS'] = [
   {dataIndex: 'owner', text: 'Owner', width: 150}, 
   {dataIndex: 'section', text: 'Team', width: 150}, 
   {dataIndex: 'call_p', text: 'Phone call', type:'int', align: 'center', width: 60, renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber}, 
   {dataIndex: 'email_p', text: 'Email', type:'int', align: 'center', width: 60, renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber}, 
   {
	   text: 'Meeting',
	   columns: [{dataIndex:'meeting_p', text: 'Plan', width: 60, align: 'center', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'meeting_q', text: 'Perform', width: 60, align: 'center', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'meeting_t', text: '%', width: 50, align: 'center', renderer: renderPrecent}]
   },
   {
	   text: 'Quote',
	   columns: [{dataIndex:'quote_p', text: 'Plan', width: 60, align: 'center', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'quote_q', text: 'Perform', width: 60, align: 'center', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'quote_t', text: '%', width: 50, align: 'center', renderer: renderPrecent}]
   },
   {
	   text: 'New Customer',
	   columns: [{dataIndex:'newcus_p', text: 'Plan', width: 60, align: 'center', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'newcus_q', text: 'Perform', width: 60, align: 'center', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'newcus_t', text: '%', width: 50, align: 'center', renderer: renderPrecent}]
   },
   {
	   text: 'Expat Customer',
	   columns: [{dataIndex:'expat_p', text: 'Plan', width: 60, align: 'center', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'expat_q', text: 'Perform', width: 60, align: 'center', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'expat_t', text: '%', width: 50, align: 'center', renderer: renderPrecent}]
   },
   {
	   text: 'VIP Customer',
	   columns: [{dataIndex:'vip_p', text: 'Plan', width: 60, align: 'center', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'vip_q', text: 'Perform', width: 60, align: 'center', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'vip_t', text: '%', width: 50, align: 'center', renderer: renderPrecent}]
   },
   {
	   text: 'Extended contracts',
	   columns: [{dataIndex:'ext_p', text: 'Plan', width: 60, align: 'center', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'ext_q', text: 'Perform', width: 60, align: 'center', renderer: renderReportNumber, summaryType: 'sum', summaryRenderer: renderTNumber},
				 {dataIndex:'ext_t', text: '%', width: 50, align: 'center', renderer: renderPrecent}]
   },
   {dataIndex:'term_p', text: 'Termination', width: 90, align: 'center', renderer: renderReportNumber}
];


columns['CRM_REPORT_RESELLER_COLUMNS'] = [
   {dataIndex: 'crm_name', text: 'Reseller name', width: 250}, 
   {dataIndex: 'owner', text: 'Owner', width: 150}, 
   {
	   text: 'Activity',
	   columns: [{dataIndex:'meeting', text: 'Meeting', width: 70, align: 'center', summaryType: 'sum', renderer: renderReportNumber},
				 {dataIndex:'phonecall', text: 'Phone call', width: 70, align: 'center', summaryType: 'sum', renderer: renderReportNumber},
				 {dataIndex:'email', text: 'Email', width: 70, align: 'center', summaryType: 'sum', renderer: renderReportNumber}]
   },
   {
	   text: 'Total',
	   columns: [{dataIndex:'total_qty', text: 'Qty', width: 70, align: 'right', summaryType: 'sum', renderer: renderReportNumber, summaryRenderer: renderTNumber},
				 {dataIndex:'total_amount', text: 'Amount', width: 130, align: 'right', summaryType: 'sum', renderer: renderMoney, summaryRenderer: renderTMoney}]
   },
   {
	   text: 'АВТОТЭЭВРИЙН ХЭРЭГСЛИЙН',
	   columns: [{dataIndex:'p1_qty', text: 'Qty', width: 60, align: 'right', summaryType: 'sum', renderer: renderReportNumber, summaryRenderer: renderTNumber},
				 {dataIndex:'p1_amount', text: 'Amount', width: 110, align: 'right', summaryType: 'sum', renderer: renderMoney, summaryRenderer: renderTMoney}]
   },
   {
	   text: 'АЛБАН ЖУРМЫН ЖОЛООЧИЙН',
	   columns: [{dataIndex:'p2_qty', text: 'Qty', width: 60, align: 'right', summaryType: 'sum', renderer: renderReportNumber, summaryRenderer: renderTNumber},
				 {dataIndex:'p2_amount', text: 'Amount', width: 110, align: 'right', summaryType: 'sum', renderer: renderMoney, summaryRenderer: renderTMoney}]
   },
   {
	   text: 'ЭД ХӨРӨНГИЙН',
	   columns: [{dataIndex:'p3_qty', text: 'Qty', width: 60, align: 'right', summaryType: 'sum', renderer: renderReportNumber, summaryRenderer: renderTNumber},
				 {dataIndex:'p3_amount', text: 'Amount', width: 110, align: 'right', summaryType: 'sum', renderer: renderMoney, summaryRenderer: renderTMoney}]
   },
   {
	   text: 'ЗЭЭЛДЭГЧИЙН ГЭНЭТИЙН ОСЛЫН',
	   columns: [{dataIndex:'p4_qty', text: 'Qty', width: 60, align: 'right', summaryType: 'sum', renderer: renderReportNumber, summaryRenderer: renderTNumber},
				 {dataIndex:'p4_amount', text: 'Amount', width: 110, align: 'right', summaryType: 'sum', renderer: renderMoney, summaryRenderer: renderTMoney}]
   },
   {
	   text: 'ГАДААД ЗОРЧИГЧИЙН',
	   columns: [{dataIndex:'p5_qty', text: 'Qty', width: 60, align: 'right', summaryType: 'sum', renderer: renderReportNumber},
				 {dataIndex:'p5_amount', text: 'Amount', width: 110, align: 'right', summaryType: 'sum', renderer: renderMoney, summaryRenderer: renderTMoney}]
   }   
];


function renderClass(v) {
/*	if (v == 'CORPORATE' || v == 'RETAIL') 
		return '';*/
	return '<span style="font-size:10px">'+v+'</span>';
}

function renderTip(v, metadata, record, rowIndex, colIndex, store) {
	//metadata.tdAttr = 'data-qtip="<b>double click</b></br>"'	
	return '<a href="javascript:customerInfo(\''+record.data['crm_id']+'\')" class="select_customer">'+v+'</a>';
}

function renderPassword(v) {
	return "**********";
}

function getDaysBetweenDates(d0, d1) {

  var msPerDay = 8.64e7;

  // Copy dates so don't mess them up
  var x0 = new Date(d0);
  var x1 = new Date(d1);

  // Set to noon - avoid DST errors
  x0.setHours(12,0,0);
  x1.setHours(12,0,0);

  // Round to remove daylight saving errors
  return Math.round( (x1 - x0) / msPerDay );
}

function renderExpiredDate(v, metadata, record, rowIndex, colIndex, store) {
	var d = getDaysBetweenDates(new Date(), v);
	if (d < 30 && d > 0)	
		metadata.tdAttr = 'data-qtip="<b>' + d + ' хоног үлдсэн</b></br>"'
	if (d < 0)	
		metadata.tdAttr = 'data-qtip="<b>' + Math.abs(d) + ' хоног хэтэрсэн</b></br>"'

	if (d < 0 || v == '0000-00-00')
		return '<span style="color:red">'+v+'</span>';
	
	return v;
}

function renderExpiredDate1(v) {
	var d = getDaysBetweenDates(new Date(), v);
	if (d < 0)
		return '<span style="color:red">'+v+'</span>';

	return v;
}

function renderUserLevel(v) {
	if (v == -1)
		return 'unemployed man';
	if (v == 0)
		return 'sales man';
	if (v == 1)
		return 'manager';
	if (v == 2)
		return 'head';
	if (v == 3)
		return 'admin';
	if (v == 5)
		return 'ceo';
	if (v == 10)
		return 'president';
	
	return v;
}


function renderDealLevel(v) {
	if (v == 'lead')
		return '<span style="color:magenta">'+v+'</span>';
	if (v == 'opportunity')
		return '<span style="color:orange">'+v+'</span>';
	if (v == 'quote')
		return '<span style="color:blue">'+v+'</span>';
	if (v == 'close as won')
		return '<span style="color:green">'+v+'</span>';
	if (v == 'close as lost' || v == 'disqualified')
		return '<span style="color:red">'+v+'</span>';
	
	return v;
}

function renderCaseLevel(v) {
	if (v == 'identify')
		return '<span style="color:magenta">'+v+'</span>';
	if (v == 'research')
		return '<span style="color:orange">'+v+'</span>';
	if (v == 'resolve')
		return '<span style="color:green">'+v+'</span>';
	
	return v;
}

function renderMail(v) {
	return '<a href="mailto:'+v+'"><span style="color:blue; text-decoration: underline;">'+v+'</span></a>';
}

function renderWWW(v) {
	var input = 'http';
	if (v != '' && v.substring(0, input.length) != input)
		v = 'http://'+v;

	return '<a href="'+v+'" target="_blank"><span style="color:blue; text-decoration: underline;">'+v+'</span></a>';
}

function renderLink(v) {
	var input = 'http';
	if (v != '' && v.substring(0, input.length) != input)
		v = 'http://'+v;

	return '<a href="'+v+'" target="_blank"><span style="color:blue; text-decoration: underline;">Attachment</span></a>';
}

function renderCampaign(v, metadata, record, rowIndex, colIndex, store) {	
	if (campaigns[v]) {
		myToolTipText = "<div style='line-height: 20px; width: 200px; background: #fff; border-radius: 3px; border: 1px solid #a9a; padding: 15px;'>";
		myToolTipText = myToolTipText + "Төлөв: "+ campaigns[v].get('campaign_status');
		myToolTipText = myToolTipText + "<br>Төрөл: "+ campaigns[v].get('campaign_type');
		myToolTipText = myToolTipText + "<br>Эхлэх: "+ campaigns[v].get('start_date');
		myToolTipText = myToolTipText + "<br>Дуусах: "+ campaigns[v].get('end_date');
		myToolTipText = myToolTipText + "<br>Expected revenue: <b>"+ renderMoney(campaigns[v].get('expected_revenue'))+"</b>";
		myToolTipText = myToolTipText + "<br>Budgeted cost: <b>"+ renderMoney(campaigns[v].get('budgeted_cost'))+"</b>";
		myToolTipText = myToolTipText + "<br>Anual cost: <b>"+ renderMoney(campaigns[v].get('actual_cost'))+"</b>";
		myToolTipText = myToolTipText + "<br>Тайлбар:<br><i>"+campaigns[v].get('descr')+"</i>";
		myToolTipText = myToolTipText + "</div>";

		metadata.tdAttr = 'data-qtip="' + myToolTipText + '"';
	}

	return v;
}

function renderCRMName(v, metadata, record, rowIndex, colIndex, store) {	
	if (v.indexOf(',') != -1)
	{	
		d = v.split(',');
		c = d[1].split(';');
		myToolTipText = "<div style='line-height: 20px; width: 250px; background: #fff; border-radius: 3px; border: 1px solid #a9a; padding: 15px;'>";
		myToolTipText = myToolTipText + "Last activity time: "+ c[0];
		myToolTipText = myToolTipText + "<br>Phone: <b>"+ c[1]+"</b>";
		myToolTipText = myToolTipText + "<br>Email: <b>"+ c[2]+"</b>";
		myToolTipText = myToolTipText + "</div>";

		metadata.tdAttr = 'data-qtip="' + myToolTipText + '"';
		return d[0];
	}

	return v;
}

function renderWarningByPhone(v, metadata, record, rowIndex, colIndex, store) {
	if (customers[v]) {
		metadata.tdAttr = 'data-qtip="Ойролцоо утга : ' + customers[v].get('firstName') + '</br>Бүртгэгдсэн: '+customers[v].get('_date')+'"';
		return '<span style="color:red">? '+v+'</span>';
	}

	return v;
}

function renderCustomerLevel(v, metadata, record, rowIndex, colIndex, store) {
	if (record.data['_class'].indexOf('VIP') != -1) v = 'vip';	
	metadata.tdAttr = 'data-qtip="<b>' + v + '</b></br>"'

	return '<span class="circle '+v+'">&nbsp;</span>';
}

function renderPriority(v) {
	return '<span class="priority '+v+'">'+v+'</span>';
}

function renderPhone(v) {
	return '<span class="contact">'+v+'</span>';
}

function renderMessageStatus(v) {
	return '<div class="'+v+'">&nbsp;</div>';
}

function renderWorkType(v) {
	return v.charAt(0).toUpperCase() + v.slice(1);
}

function renderSecond(v) {
	if (v == 0)
		return '';
	return v+' сек';
}

function renderTSecond(v) {
	if (v == 0)
		return '';
	return '<b>'+v+' сек</b>';
}

function renderOwner(v) {
	if (v == logged)
		return '<span style="color:purple">'+v+'</span>';

	return '<span style="color:gray">'+v+'</span>';
}

function renderComplainStatus(v) {
	if (v == 'pending')
		return '<span style="color:red">pending</span>';
	if (v == 'transfered')
		return '<span style="color:orange">transfered</span>';
	if (v == 'closed')
		return '<span style="color:green">closed</span>';

	return v;
}

function renderQuoteStatus(v) {
	if (v == 'draft')
		return '<span style="color:red">draft</span>';
	if (v == 'negotiation')
		return '<span style="color:orange">negotiation</span>';
	if (v == 'delivered')
		return '<span style="color:brown">delivered</span>';
	if (v == 'on hold')
		return '<span style="color:purple">on hold</span>';
	if (v == 'confirmed')
		return '<span style="color:blue">confirmed</span>';
	if (v == 'close as won')
		return '<span style="color:green">close as won</span>';
	if (v == 'close as lost')
		return '<span style="color:red; text-decoration : line-through">close as lost</span>';

	return v;
}

function renderDealName(v) {
	if (v.length < 4)	
		return '';

	return v;
}

function renderServiceName(v) {
	if (v.length < 4)	
		return '';

	return v;
}

function renderCallStatus(v) {
	if (v == 'success')
		return '<span style="color:green">success</span>';
	if (v == 'pending')
		return '<span style="color:orange">pending</span>';
	if (v == 'remind')
		return '<span style="color:blue">remind</span>';
	if (v == 'unsuccess')
		return '<span style="color:red">unsuccess</span>';

	return v;
}

function renderEventStatus(v) {
	if (v == 'success')
		return '<span style="color:green">success</span>';
	if (v == 'pending')
		return '<span style="color:orange">pending</span>';
	if (v == 'cancelled')
		return '<span style="color:red; text-decoration : line-through">cancelled</span>';

	return v;
}


function renderTaskStatus(v) {
	if (v == 'completed')
		return '<span style="color:green">completed</span>';
	if (v == 'pending')
		return '<span style="color:orange">pending</span>';
	if (v == 'failed')
		return '<span style="color:red; text-decoration : line-through">failed</span>';

	return v;
}


function renderCampaignStatus(v) {
	if (v == 'planning')
		return '<span style="color:orange">planning</span>';
	if (v == 'active')
		return '<span style="color:green">active</span>';
	if (v == 'inactive')
		return '<span style="color:red">inactive</span>';
	if (v == 'complete')
		return '<span style="color:purple">complete</span>';

	return v;
}

function renderPrecent(v) {
	if (v == 0)
		return '';

	if (v < 20)
		return '<span style="color:red">'+Ext.util.Format.number(v, '00,00,000.00')+'%</span>';
	if (v >= 20 && v < 75)
		return '<span style="color:orange">'+Ext.util.Format.number(v, '00,00,000.00')+'%</span>';
	if (v >= 75)
		return '<span style="color:green">'+Ext.util.Format.number(v, '00,00,000.00')+'%</span>';
	
	return v;
} 

function renderTPrecent(v) {	
	return '<strong>'+Ext.util.Format.number(v, '00,00,000.00')+'%</strong>';
}

function renderTopicName(v, metadata, record, rowIndex, colIndex, store) {	
	if (record.data && record.data['notify'])
		return v+' '+record.data['notify'];

	return v;
}


function renderTMoney(v) {
/*	if (logged == 'batbileg@mxc')
		return '--.---';*/
	return '<strong>'+Ext.util.Format.number(v, '00,00,000.00')+'₮</strong>';
}

function renderMoney(v) {
	/*if (logged == 'batbileg@mxc')
		return '--.---';*/

	if (v == 0)
		return '';
	return Ext.util.Format.number(v, '00,00,000.00')+'₮';
}

function renderTNumber(v) {
	return '<strong>'+Ext.util.Format.number(v, '00,00,000.00')+'</strong>';
}

function renderIntNumber(v) {
	if (v == 0) return '';	
	return Ext.util.Format.number(v, '00,00,000');
}

function renderNumber(v) {
	return Ext.util.Format.number(v, '00,00,000.00');
}

function renderENumber(v) {
	return Ext.util.Format.number(v, '00,00,000');
}


function renderReportNumber(v) {
	if (v == 0)
		return '';
	return Ext.util.Format.number(v, '00,00,000.00');
}

function renderTReportNumber(v) {
	if (v == 0)
		return '';
	return '<strong>'+Ext.util.Format.number(v, '00,00,000.00')+'</strong>';
}


function renderDate(v) {
	if (v == '0000-00-00') return '';
	
	var date = new Date(v);
	return Ext.Date.format(date,'Y-m-d');
}

Date.daysBetween = function( date1, date2 ) {
  //Get 1 day in milliseconds
  var one_day=1000*60*60*24;

  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();

  // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;
    
  // Convert back to days and return
  return Math.round(difference_ms/one_day); 
}

function renderCreatedDate(time) {
	var date = new Date(time);
	if (Math.abs(Date.daysBetween(new Date(), date)) >= 10) {		
		return Ext.Date.format(date,'Y-m-d');
	}	

	switch (typeof time) {
		case 'number': break;
		case 'string': time = +new Date(time); break;
		case 'object': if (time.constructor === Date) time = time.getTime(); break;
		default: time = +new Date();
	}
	var time_formats = [
		[60, 'seconds', 1], // 60
		[120, '1 minute ago', '1 minute from now'], // 60*2
		[3600, 'minutes', 60], // 60*60, 60
		[7200, '1 hour ago', '1 hour from now'], // 60*60*2
		[86400, 'hours', 3600], // 60*60*24, 60*60
		[172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
		[604800, 'days', 86400], // 60*60*24*7, 60*60*24
		[1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
		[2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
		[4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
		[29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
		[58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
		[2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
		[5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
		[58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
	];
	var seconds = (+new Date() - time) / 1000,
		token = 'ago', list_choice = 1;

	if (seconds < 5*60) {
		return '<span class="gray">Just now</span>'
	}
	if (seconds < 0) {
		seconds = Math.abs(seconds);
		token = 'from now';
		list_choice = 2;
	}
	var i = 0, format;
	while (format = time_formats[i++])
		if (seconds < format[0]) {
			if (typeof format[2] == 'string')
				return '<span class="gray">'+format[list_choice]+'</span>';
			else
				return '<span class="gray">'+Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token+'</span>';
		}

	return '<span class="gray">'+time+'</span>';	
}

function renderTime(v) {
	var date = new Date(v);
	var h = date.getHours();
	var m = date.getMinutes();
	if (isNaN(h)) return v;	
	return (h<10?'0'+h:h) + ":" + (m<10?'0'+m:m);	
}

function renderAny(v) {
	return v;
}

Ext.define('Teller.ext.CurrencyField', {
    extend: 'Ext.form.field.Number',
    alias: 'widget.currencyfield1',
	config: {
        thousandSeparator: ',',
        currencyAtEnd: true,
        currencySign: '₮'
    },

    hideTrigger: true,

    setValue: function (v) {
        this.callParent(arguments);

        if (!Ext.isEmpty(this.getValue())) {
            this.setRawValue(Ext.util.Format.currency(this.getValue()));
        }
    },

    removeFormat: function (v) {
        if (Ext.isEmpty(v)) {
            return '';
        } else {
            v = v.toString().replace(Ext.util.Format.currencySign, '').replace(Ext.util.Format.thousandSeparator, '');
            if (v % 1 === 0) {
                // Return value formatted with no precision since there are no digits after the decimal
                return Ext.util.Format.number(v, '0');
            } else {
                // Return value formatted with precision of two digits since there are digits after the decimal
                return Ext.util.Format.number(v, '0.00');
            }
        }
    },

    // Override parseValue to remove the currency format
    parseValue: function (v) {
        return this.callParent([this.removeFormat(v)]);
    },

    // Remove the format before validating the value
    getErrors: function (v) {
        return this.callParent([this.removeFormat(v)]);
    },

    /* Override getSubmitData to remove the currency format on the value 
    that will be passed out from the getValues method of the form */
    getSubmitData: function () {
        var returnObject = {};
        returnObject[this.name] = this.removeFormat(this.callParent(arguments)[this.name]);

        return returnObject;
    },

    // Override preFocus to remove the format during edit
    preFocus: function () {
        this.setRawValue(this.removeFormat(this.getRawValue()));

        this.callParent(arguments);
    }
});

Ext.define('Ext.ux.form.CurrencyField', {
    extend: 'Ext.form.field.Number',
    alias: ['widget.currencyfieldex'],
    config: {
        thousandSeparator: ',',
        currencyAtEnd: true,
        currencySign: '₮'
    },

    listeners: {
        /**
         * When this component get the focus, change the Currency
         * representation to a Float one for edition.
         *
         * @param me
         * @param eOpts
         */
        focus: function (me, eOpts) {
            me.inputEl.dom.value = this.getValue();
        }
    },

    /**
     * Converts a Float value into a currency formated value ready to display .
     *
     * @param {Object} value
     * @return {Object} The converted value.
     */
    valueToCurrency: function (value) {
        var format = Ext.util.Format;
        format.currencyPrecision = this.decimalPrecision;
        format.thousandSeparator = this.thousandSeparator;
        format.currencySign = this.currencySign;
        format.currencyAtEnd = true;
        return format.currency(value);
    },

    /**
     * Converts a mixed-type value to a raw representation suitable for displaying in the field. This allows controlling
     * how value objects passed to {@link #setValue} are shown to the user, including localization.
     *
     * See {@link #rawToValue} for the opposite conversion.
     *
     * This implementation converts the raw value to a value formated as currency.
     *
     * @param {Object} value The mixed-type value to convert to the raw representation.
     * @return {Object} The converted raw value.
     */
    valueToRaw: function (value) {
        return this.valueToCurrency(value);
    },

    /**
     * Performs any necessary manipulation of a raw String value to prepare it for conversion and/or
     * {@link #validate validation}. Overrided to apply the {@link #parseValue}
     * to the raw value.
     *
     * @param {String} value The unprocessed string value
     * @return {String} The processed string value
     */
    processRawValue: function (value) {
        return this.parseValue(this.callParent(arguments));
    },

    /**
     * Overrided to remove thousand separator.
     *
     * @param value
     */
    parseValue: function (value) {
        value = String(value).replace(this.thousandSeparator, "");
        value = parseFloat(String(value).replace(this.decimalSeparator, '.'));
        return isNaN(value) ? null : value;
    }
});


Ext.define('Ext.ux.form.NumericField', {
    extend: 'Ext.form.field.Number',
    alias: 'widget.currencyfield',
    
    currencySymbol: '₮',
    currencySymbolPos : 'left', 
    useThousandSeparator: true,
    thousandSeparator: ',',
    alwaysDisplayDecimals: true,
    fieldStyle: 'text-align: right;',
    hideTrigger: true,
    
    initComponent: function(){
        if (this.useThousandSeparator && this.decimalSeparator == ',' && this.thousandSeparator == ',') 
            this.thousandSeparator = '.';
        else 
            if (this.allowDecimals && this.thousandSeparator == '.' && this.decimalSeparator == '.') 
                this.decimalSeparator = ',';
        
        this.callParent(arguments);
    },
    setValue: function(value){
        Ext.ux.form.NumericField.superclass.setValue.call(this, value !=  null ? value.toString().replace('.', this.decimalSeparator) : value);
        
        this.setRawValue(this.getFormattedValue(this.getValue()));
    },
    getFormattedValue: function(value){
        if (Ext.isEmpty(value) || !this.hasFormat()) 
            return value;
        else 
        {
            var neg = null;
            
            value = (neg = value < 0) ? value * -1 : value;
            value = this.allowDecimals && this.alwaysDisplayDecimals ? value.toFixed(this.decimalPrecision) : value;
            
            if (this.useThousandSeparator) 
            {
                if (this.useThousandSeparator && Ext.isEmpty(this.thousandSeparator)) 
                    throw ('NumberFormatException: invalid thousandSeparator, property must has a valid character.');
                
                if (this.thousandSeparator == this.decimalSeparator) 
                    throw ('NumberFormatException: invalid  thousandSeparator, thousand separator must be different from  decimalSeparator.');
                
                value = value.toString();
                
                
                var ps = value.split('.');
                ps[1] = ps[1] ? ps[1] : null;
                
                var whole = ps[0];
                
                var r = /(\d+)(\d{3})/;
                
                var ts = this.thousandSeparator;
                
                while (r.test(whole)) 
                    whole = whole.replace(r, '$1' + ts + '$2');
                
                value = whole;
                
            }
            
            if (this.currencySymbolPos == 'right') {
                return Ext.String.format('{0}{1}{2}', (neg ? '-' : ''),  value, (Ext.isEmpty(this.currencySymbol) ? '' : ' ' +  this.currencySymbol));
            } else {
                return Ext.String.format('{0}{1}{2}', (neg ? '-'  : ''), (Ext.isEmpty(this.currencySymbol) ? '' : this.currencySymbol + '  '), value);
            }
        }
    },
    
    parseValue: function(value){
        return Ext.ux.form.NumericField.superclass.parseValue.call(this, this.removeFormat(value));
    },
    
    removeFormat: function(value){
        if (Ext.isEmpty(value) || !this.hasFormat()) 
            return value;
        else 
        {
            if (this.currencySymbolPos == 'right') {
                value = value.toString().replace(' ' + this.currencySymbol, '');
            } else {
                value = value.toString().replace(this.currencySymbol + ' ', '');
            }
            
            value = this.useThousandSeparator ? value.replace(new RegExp('[' + this.thousandSeparator + ']', 'g'), '') : value;
            
            return value;
        }
    },
    
    getErrors: function(value){
        return Ext.ux.form.NumericField.superclass.getErrors.call(this, this.removeFormat(value));
    },
    hasFormat: function(){
        return this.decimalSeparator != '.' ||  (this.useThousandSeparator == true && this.getRawValue() !=  null) || !Ext.isEmpty(this.currencySymbol) ||  this.alwaysDisplayDecimals;
    },
    
    listeners:{
      'change':function(){
          val=this.getFormattedValue(this.parseValue(this.getRawValue()));
          this.setValue(val);
      }  
    },
    processRawValue: function(value) {
        return this.removeFormat(value);
    }
});



Ext.define('Ext.ux.mxc.NumericField',
{
    extend: 'Ext.form.field.Number',//Extending the NumberField
    alias: 'widget.numericfield',//Defining the xtype,
    currencySymbol: null,
    useThousandSeparator: true,
    thousandSeparator: ',',
    alwaysDisplayDecimals: false,
    fieldStyle: 'text-align: right;',
    
	initComponent: function(){
        if (this.useThousandSeparator && this.decimalSeparator == ',' && this.thousandSeparator == ',')
            this.thousandSeparator = '.';
        else
            if (this.allowDecimals && this.thousandSeparator == '.' && this.decimalSeparator == '.')
                this.decimalSeparator = ',';
       
        this.callParent(arguments);
    },
    setValue: function(value){
        Ext.ux.form.NumericField.superclass.setValue.call(this, value != null ? value.toString().replace('.', this.decimalSeparator) : value);
       
        this.setRawValue(this.getFormattedValue(this.getValue()));
    },
    getFormattedValue: function(value){
        if (Ext.isEmpty(value) || !this.hasFormat())
            return value;
        else
        {
            var neg = null;
           
            value = (neg = value < 0) ? value * -1 : value;
            value = this.allowDecimals && this.alwaysDisplayDecimals ? value.toFixed(this.decimalPrecision) : value;
           
            if (this.useThousandSeparator)
            {
                if (this.useThousandSeparator && Ext.isEmpty(this.thousandSeparator))
                    throw ('NumberFormatException: invalid thousandSeparator, property must has a valid character.');
               
                if (this.thousandSeparator == this.decimalSeparator)
                    throw ('NumberFormatException: invalid thousandSeparator, thousand separator must be different from decimalSeparator.');
               
                value = value.toString();
               
                var ps = value.split('.');
                ps[1] = ps[1] ? ps[1] : null;
               
                var whole = ps[0];
               
                var r = /(\d+)(\d{3})/;
               
                var ts = this.thousandSeparator;
               
                while (r.test(whole))
                    whole = whole.replace(r, '$1' + ts + '$2');
               
                value = whole + (ps[1] ? this.decimalSeparator + ps[1] : '');
            }
           
            return Ext.String.format('{0}{1}{2}', (neg ? '-' : ''), (Ext.isEmpty(this.currencySymbol) ? '' : this.currencySymbol + ' '), value);
        }
    },
    /**
     * overrides parseValue to remove the format applied by this class
     */
    parseValue: function(value){
        //Replace the currency symbol and thousand separator
        return Ext.ux.form.NumericField.superclass.parseValue.call(this, this.removeFormat(value));
    },
    /**
     * Remove only the format added by this class to let the superclass validate with it's rules.
     * @param {Object} value
     */
    removeFormat: function(value){
        if (Ext.isEmpty(value) || !this.hasFormat())
            return value;
        else
        {
            value = value.toString().replace(this.currencySymbol + ' ', '');
           
            value = this.useThousandSeparator ? value.replace(new RegExp('[' + this.thousandSeparator + ']', 'g'), '') : value;
           
            return value;
        }
    },
    /**
     * Remove the format before validating the the value.
     * @param {Number} value
     */
    getErrors: function(value){
        return Ext.ux.form.NumericField.superclass.getErrors.call(this, this.removeFormat(value));
    },
    hasFormat: function(){
        return this.decimalSeparator != '.' || (this.useThousandSeparator == true && this.getRawValue() != null) || !Ext.isEmpty(this.currencySymbol) || this.alwaysDisplayDecimals;
    },
    /**
     * Display the numeric value with the fixed decimal precision and without the format using the setRawValue, don't need to do a setValue because we don't want a double
     * formatting and process of the value because beforeBlur perform a getRawValue and then a setValue.
     */
    onFocus: function(){
        this.setRawValue(this.removeFormat(this.getRawValue()));
       
        this.callParent(arguments);
    }
});

Ext.override('Ext.data.Store', {

  fireEvent: function(eventName, store) {
    if(store && store.isStore && eventName === "datachanged") {
      this.sortGroupedStore();
    }
    
    return this.callParent(arguments);
  },

  sortGroupedStore: function() {
    if (this.isGrouped()) {


      var me = this,
          collection = me.data,
          items = [],
          keys = [],
          groups, length, children, lengthChildren,
          i, j;


      groups = me.getGroups();
      length = groups.length;


      for (i = 0; i < length; i++) {
        children = groups[i].children;
        lengthChildren = children.length;


        for (j = 0; j < lengthChildren; j++) {
          items.push(children[j]);
          keys.push(children[j].internalId);
        }
      }


      collection.items = items;
      collection.keys = keys;


      collection.fireEvent('sort', collection, items, keys);
    }
  }
}); 

function customerInfo(crm_id) {
/*	var store = views['retail_list'];
	var record = new store.recordType({
		crm_id: crm_id,
		parent_crm_id: crm_id,
		type: 'БАЙГУУЛЛГА',
		firstName: ''
	});*/

	new OCS.CustomerDetailWindow({
		
	}).show();
}

String.prototype.replaceAll = function( token, newToken, ignoreCase ) {
    var _token;
    var str = this + "";
    var i = -1;

    if ( typeof token === "string" ) {

        if ( ignoreCase ) {

            _token = token.toLowerCase();

            while( (
                i = str.toLowerCase().indexOf(
                    token, i >= 0 ? i + newToken.length : 0
                ) ) !== -1
            ) {
                str = str.substring( 0, i ) +
                    newToken +
                    str.substring( i + token.length );
            }

        } else {
            return this.split( token ).join( newToken );
        }

    }
return str;
};


/* 
 *	Notification extension for Ext JS 4.0.2+
 *	Version: 2.1.3
 *
 *	Copyright (c) 2011 Eirik Lorentsen (http://www.eirik.net/)
 *
 *	Follow project on GitHub: https://github.com/EirikLorentsen/Ext.ux.window.Notification
 *
 *	Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 *	and GPL (http://opensource.org/licenses/GPL-3.0) licenses.
 *
 */

Ext.define('Ext.ux.window.Notification', {
	extend: 'Ext.window.Window',
	alias: 'widget.uxNotification',

	cls: 'ux-notification-window',
	autoClose: true,
	autoHeight: true,
	plain: false,
	draggable: false,
	shadow: false,
	focus: Ext.emptyFn,

	// For alignment and to store array of rendered notifications. Defaults to document if not set.
	manager: null,

	useXAxis: false,

	// Options: br, bl, tr, tl, t, l, b, r
	position: 'br',

	// Pixels between each notification
	spacing: 6,

	// Pixels from the managers borders to start the first notification
	paddingX: 30,
	paddingY: 10,
	
	minWidth: 200,

	slideInAnimation: 'easeIn',
	slideBackAnimation: 'bounceOut',
	slideInDuration: 500,
	slideBackDuration: 1000,
	hideDuration: 500,
	autoCloseDelay: 10000,
	stickOnClick: true,
	stickWhileHover: true,

	// Private. Do not override!
	isHiding: false,
	isFading: false,
	destroyAfterHide: false,
	closeOnMouseOut: false,

	// Caching coordinates to be able to align to final position of siblings being animated
	xPos: 0,
	yPos: 0,

	statics: {
		defaultManager: {
			el: null
		}
	},

	initComponent: function() {
		var me = this;

		// Backwards compatibility
		if (Ext.isDefined(me.corner)) {
			me.position = me.corner;
		}
		if (Ext.isDefined(me.slideDownAnimation)) {
			me.slideBackAnimation = me.slideDownAnimation;
		}
		if (Ext.isDefined(me.autoDestroyDelay)) {
			me.autoCloseDelay = me.autoDestroyDelay;
		}
		if (Ext.isDefined(me.autoHideDelay)) {
			me.autoCloseDelay = me.autoHideDelay;
		}
		if (Ext.isDefined(me.autoHide)) {
			me.autoClose = me.autoHide;
		}
		if (Ext.isDefined(me.slideInDelay)) {
			me.slideInDuration = me.slideInDelay;
		}
		if (Ext.isDefined(me.slideDownDelay)) {
			me.slideBackDuration = me.slideDownDelay;
		}
		if (Ext.isDefined(me.fadeDelay)) {
			me.hideDuration = me.fadeDelay;
		}

		// 'bc', lc', 'rc', 'tc' compatibility
		me.position = me.position.replace(/c/, '');

		me.updateAlignment(me.position);

		me.setManager(me.manager);

		me.callParent(arguments);
	},

	onRender: function() {
		var me = this;
		me.callParent(arguments);

		me.el.hover(
			function () {
				me.mouseIsOver = true;
			},
			function () {
				me.mouseIsOver = false;
				if (me.closeOnMouseOut) {
					me.closeOnMouseOut = false;
					me.close();
				}
			},
			me
		);

	},
	
	updateAlignment: function (position) {
		var me = this;

		switch (position) {
			case 'br':
				me.paddingFactorX = -1;
				me.paddingFactorY = -1;
				me.siblingAlignment = "br-br";
				if (me.useXAxis) {
					me.managerAlignment = "bl-br";
				} else {
					me.managerAlignment = "tr-br";
				}
				break;
			case 'bl':
				me.paddingFactorX = 1;
				me.paddingFactorY = -1;
				me.siblingAlignment = "bl-bl";
				if (me.useXAxis) {
					me.managerAlignment = "br-bl";
				} else {
					me.managerAlignment = "tl-bl";
				}
				break;
			case 'tr':
				me.paddingFactorX = -1;
				me.paddingFactorY = 1;
				me.siblingAlignment = "tr-tr";
				if (me.useXAxis) {
					me.managerAlignment = "tl-tr";
				} else {
					me.managerAlignment = "br-tr";
				}
				break;
			case 'tl':
				me.paddingFactorX = 1;
				me.paddingFactorY = 1;
				me.siblingAlignment = "tl-tl";
				if (me.useXAxis) {
					me.managerAlignment = "tr-tl";
				} else {
					me.managerAlignment = "bl-tl";
				}
				break;
			case 'b':
				me.paddingFactorX = 0;
				me.paddingFactorY = -1;
				me.siblingAlignment = "b-b";
				me.useXAxis = 0;
				me.managerAlignment = "t-b";
				break;
			case 't':
				me.paddingFactorX = 0;
				me.paddingFactorY = 1;
				me.siblingAlignment = "t-t";
				me.useXAxis = 0;
				me.managerAlignment = "b-t";
				break;
			case 'l':
				me.paddingFactorX = 1;
				me.paddingFactorY = 0;
				me.siblingAlignment = "l-l";
				me.useXAxis = 1;
				me.managerAlignment = "r-l";
				break;
			case 'r':
				me.paddingFactorX = -1;
				me.paddingFactorY = 0;
				me.siblingAlignment = "r-r";
				me.useXAxis = 1;
				me.managerAlignment = "l-r";
				break;
			}
	},
	
	getXposAlignedToManager: function () {
		var me = this;

		var xPos = 0;

		// Avoid error messages if the manager does not have a dom element
		if (me.manager && me.manager.el && me.manager.el.dom) {
			if (!me.useXAxis) {
				// Element should already be aligned vertically
				return me.el.getLeft();
			} else {
				// Using getAnchorXY instead of getTop/getBottom should give a correct placement when document is used
				// as the manager but is still 0 px high. Before rendering the viewport.
				if (me.position == 'br' || me.position == 'tr' || me.position == 'r') {
					xPos += me.manager.el.getAnchorXY('r')[0];
					xPos -= (me.el.getWidth() + me.paddingX);
				} else {
					xPos += me.manager.el.getAnchorXY('l')[0];
					xPos += me.paddingX;
				}
			}
		}

		return xPos;
	},

	getYposAlignedToManager: function () {
		var me = this;

		var yPos = 0;

		// Avoid error messages if the manager does not have a dom element
		if (me.manager && me.manager.el && me.manager.el.dom) {
			if (me.useXAxis) {
				// Element should already be aligned horizontally
				return me.el.getTop();
			} else {
				// Using getAnchorXY instead of getTop/getBottom should give a correct placement when document is used
				// as the manager but is still 0 px high. Before rendering the viewport.
				if (me.position == 'br' || me.position == 'bl' || me.position == 'b') {
					yPos += me.manager.el.getAnchorXY('b')[1];
					yPos -= (me.el.getHeight() + me.paddingY);
				} else {
					yPos += me.manager.el.getAnchorXY('t')[1];
					yPos += me.paddingY;
				}
			}
		}

		return yPos;
	},

	getXposAlignedToSibling: function (sibling) {
		var me = this;

		if (me.useXAxis) {
			if (me.position == 'tl' || me.position == 'bl' || me.position == 'l') {
				// Using sibling's width when adding
				return (sibling.xPos + sibling.el.getWidth() + sibling.spacing);
			} else {
				// Using own width when subtracting
				return (sibling.xPos - me.el.getWidth() - me.spacing);
			}
		} else {
			return me.el.getLeft();
		}

	},

	getYposAlignedToSibling: function (sibling) {
		var me = this;

		if (me.useXAxis) {
			return me.el.getTop();
		} else {
			if (me.position == 'tr' || me.position == 'tl' || me.position == 't') {
				// Using sibling's width when adding
				return (sibling.yPos + sibling.el.getHeight() + sibling.spacing);				
			} else {
				// Using own width when subtracting
				return (sibling.yPos - me.el.getHeight() - sibling.spacing);
			}
		}
	},

	getNotifications: function (alignment) {
		var me = this;

		if (!me.manager.notifications[alignment]) {
			me.manager.notifications[alignment] = [];
		}

		return me.manager.notifications[alignment];
	},

	setManager: function (manager) {
		var me = this;

		me.manager = manager;

		if (typeof me.manager == 'string') {
			me.manager = Ext.getCmp(me.manager);
		}

		// If no manager is provided or found, then the static object is used and the el property pointed to the body document.
		if (!me.manager) {
			me.manager = me.statics().defaultManager;

			if (!me.manager.el) {
				me.manager.el = Ext.getBody();
			}
		}
		
		if (typeof me.manager.notifications == 'undefined') {
			me.manager.notifications = {};
		}
	},
	
	beforeShow: function () {
		var me = this;

		if (me.stickOnClick) {
			if (me.body && me.body.dom) {
				Ext.fly(me.body.dom).on('click', function () {
					me.cancelAutoClose();
					me.addCls('notification-fixed');
				}, me);
			}
		}

		if (me.autoClose) {
			me.task = new Ext.util.DelayedTask(me.doAutoClose, me);
			me.task.delay(me.autoCloseDelay);
		}

		// Shunting offscreen to avoid flicker
		me.el.setX(-10000);
		me.el.setOpacity(1);
		
	},

	afterShow: function () {
		var me = this;

		me.callParent(arguments);

		var notifications = me.getNotifications(me.managerAlignment);

		if (notifications.length) {
			me.el.alignTo(notifications[notifications.length - 1].el, me.siblingAlignment, [0, 0]);
			me.xPos = me.getXposAlignedToSibling(notifications[notifications.length - 1]);
			me.yPos = me.getYposAlignedToSibling(notifications[notifications.length - 1]);
		} else {
			me.el.alignTo(me.manager.el, me.managerAlignment, [(me.paddingX * me.paddingFactorX), (me.paddingY * me.paddingFactorY)], false);
			me.xPos = me.getXposAlignedToManager();
			me.yPos = me.getYposAlignedToManager();
		}

		Ext.Array.include(notifications, me);

		// Repeating from coordinates makes sure the windows does not flicker into the center of the viewport during animation
		me.el.animate({
			from: {
				x: me.el.getX(),
				y: me.el.getY()
			},
			to: {
				x: me.xPos,
				y: me.yPos,
				opacity: 1
			},
			easing: me.slideInAnimation,
			duration: me.slideInDuration,
			dynamic: true
		});

	},
	
	slideBack: function () {
		var me = this;

		var notifications = me.getNotifications(me.managerAlignment);
		var index = Ext.Array.indexOf(notifications, me)

		// Not animating the element if it already started to hide itself or if the manager is not present in the dom
		if (!me.isHiding && me.el && me.manager && me.manager.el && me.manager.el.dom && me.manager.el.isVisible()) {

			if (index) {
				me.xPos = me.getXposAlignedToSibling(notifications[index - 1]);
				me.yPos = me.getYposAlignedToSibling(notifications[index - 1]);
			} else {
				me.xPos = me.getXposAlignedToManager();
				me.yPos = me.getYposAlignedToManager();
			}

			me.stopAnimation();

			me.el.animate({
				to: {
					x: me.xPos,
					y: me.yPos
				},
				easing: me.slideBackAnimation,
				duration: me.slideBackDuration,
				dynamic: true
			});
		}
	},

	cancelAutoClose: function() {
		var me = this;

		if (me.autoClose) {
			me.task.cancel();
		}
	},

	doAutoClose: function () {
		var me = this;

		if (!(me.stickWhileHover && me.mouseIsOver)) {
			// Close immediately
			me.close();
		} else {
			// Delayed closing when mouse leaves the component.
			me.closeOnMouseOut = true;
		}
	},

	removeFromManager: function () {
		var me = this;

		if (me.manager) {
			var notifications = me.getNotifications(me.managerAlignment);
			var index = Ext.Array.indexOf(notifications, me);
			if (index != -1) {
				// Requires Ext JS 4.0.2
				Ext.Array.erase(notifications, index, 1);

				// Slide "down" all notifications "above" the hidden one
				for (;index < notifications.length; index++) {
					notifications[index].slideBack();
				}
			}
		}
	},

	hide: function () {
		var me = this;

		if (me.isHiding) {
			if (!me.isFading) {
				me.callParent(arguments);
				// Must come after callParent() since it will pass through hide() again triggered by destroy()
				me.isHiding = false;
			}
		} else {
			// Must be set right away in case of double clicks on the close button
			me.isHiding = true;
			me.isFading = true;

			me.cancelAutoClose();

			if (me.el) {
				me.el.fadeOut({
					opacity: 0,
					easing: 'easeIn',
					duration: me.hideDuration,
					remove: me.destroyAfterHide,
					listeners: {
						afteranimate: function () {
							me.isFading = false;
							me.removeCls('notification-fixed');
							me.removeFromManager();
							me.hide(me.animateTarget, me.doClose, me);
						}
					}
				});
			}
		}

		return me;
	},

	destroy: function () {
		var me = this;
		if (!me.hidden) {
			me.destroyAfterHide = true;
			me.hide(me.animateTarget, me.doClose, me);
		} else {
			me.callParent(arguments);
		}
	}

});
