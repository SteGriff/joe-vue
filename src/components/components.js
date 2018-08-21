Vue.component('joe-table', {
  props: ['value', 'shown-editors'],
  methods : {
    isShown : function(id)
    {
      return this.shownEditors.indexOf(id) !== -1;
    },
	deleteEntity : function(entity)
	{
	  var index = this.value.indexOf(entity);
	  if (index === -1) { return; }
	  this.value.splice(index, 1);
	},
	duplicateEntity : function(entity)
	{
	  var index = this.value.indexOf(entity);
	  if (index === -1) { return; }
	  var duplicate = clone(entity);
	  this.value.splice(index + 1, 0, duplicate);
	},
	dataIsArray : function()
	{
	  return Object.prototype.toString.call(this.value) === '[object Array]';
	}
  },
  template: `<div>
			<table class="collapse">
			<tbody v-for="(entity, ekey) in value">
			<tr>
			<td class="pa1"><b>{{ekey}}</b></td>
			<td
			class="pa1 ba b--black"
			v-if="typeof(entity) === 'object'"
			v-for="(field, key, index) in entity">
				<joe-input
					v-if="typeof(field) !== 'object'"
					v-model="value[ekey][key]"
					v-bind:name="key">
				</joe-input>
				<button
				v-if="typeof(field) === 'object'"
				v-on:click="$emit('toggle', ekey + key)">
				🔽 {{key}}
				</button>
			</td>
			<td 
			  class="pa1 ba b--black"
			  v-if="typeof(entity) === 'string'">
				<joe-input
					v-model="value[ekey]"
					v-bind:name="ekey">
				</joe-input>
			</td>
			<td colspan="100"
			  class="pa1 ba b--black"
			  v-if="dataIsArray()">
				<button
				  class="fr"
				  v-on:click="deleteEntity(entity)"
				  >🗑️</button>
				<button
				  class="fr"
				  v-on:click="duplicateEntity(entity)"				  
				  >📋</button>
			</td>
			<td colspan="100"
			  class="pa1 ba b--black"
			  v-if="!dataIsArray()">
				<small>(Not an array)</small>
			</td>
			</tr>
			<tr
				v-bind:id="ekey + key"
				v-if="typeof(field) === 'object' && isShown(ekey + key)"
				v-for="(field, key, index) in entity">
				<td class="pa1 ba b--black" colspan="100">
				<joe-table
					v-model="value[ekey][key]"
					v-bind:shown-editors="shownEditors">
				</joe-table>
				</td>
			</tr>
			</tbody>
			</table>
			</div>`
})

Vue.component('joe-input', {
  props: ['value', 'name'],
  template: `<div>
			<label :for="name">
				{{name}}
			</label>
			<input
				:id="name"
				:name="name"
				:value="value"
				v-on:input="$emit('input', $event.target.value)"/>
			</div>`
})

Vue.component('joe-ul', {
  props: ['value'],
  template: `<ul>
				<li v-for="(entity, ekey) in value">
					<span v-if="typeof(entity) === 'object'">
					{{ekey}}
					<ul>
						<li v-for="(value, key) in entity">
							<b>{{key}}</b> : {{value}}
						</li>
					</ul>
					</span>
					<span v-if="typeof(entity) === 'string'">
					"{{entity}}"
					</span>
				</li>
			</ul>`
})

Vue.component('json-editor', {
  props: ['value'],
  template: `<p contenteditable v-on:input="$emit('input', JSON.parse($event.target.innerText))">{{value}}</p>`
})