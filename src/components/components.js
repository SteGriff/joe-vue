Vue.component('joe-table', {
  props: ['value'],
  template: `<table>
			<tbody v-for="(entity, ekey) in value">
			<tr>
			<td
			v-if="typeof(entity) === 'object'"
			v-for="(field, key) in entity">
				<joe-input
					v-if="typeof(field) !== 'object'"
					v-model="value[ekey][key]"
					v-bind:name="key">
				</joe-input>
				<joe-table
				v-if="typeof(field) === 'object'"
				v-model="value[ekey][key]">
				</joe-table>
			</td>
			<td v-if="typeof(entity) === 'string'">
				<joe-input
					v-model="value[ekey]"
					v-bind:name="ekey">
				</joe-input>
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