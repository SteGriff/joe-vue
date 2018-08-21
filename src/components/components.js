Vue.component('joe-table', {
  props: ['value', 'shown-editors'],
  methods : {
    isShown : function(id)
    {
      return this.shownEditors.indexOf(id) !== -1;
    }
  },
  template: `<table class="collapse">
			<tbody v-for="(entity, ekey) in value">
			<tr>
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
				{{key}}
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
			</table>`
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
				<li v-for="entity in value">
					<span v-if="typeof(entity) === 'object'">
					{{entity.name}}
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