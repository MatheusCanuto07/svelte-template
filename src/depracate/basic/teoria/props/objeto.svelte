<script>
	let {
		name,
		version,
		speed,
		website
	} = $props();

	let href = $derived(`https://www.npmjs.com/package/${name}`);
</script>

<p>
	The <code>{name}</code> package is {speed} fast. Download version {version} from
	<a {href}>npm</a> and <a href={website}>learn more here</a>
</p>
