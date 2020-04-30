let applyChanges = false;
const macro = game.macros.entities.find(m => m.name === "lv-consum-generic");
if(!macro) {
ui.notifications.error("Cette macro dépends de la macro 'lv-consum-generic' qui ne peut être trouvée.");
  return;
}
new Dialog({
  title: `Lanterne à capote`,
  content: `
    <form>
      <div class="form-group">
        <label>Allumer/Eteindre :</label>
        <select id="light-source" name="light-source">
          <option value="none">Eteindre</option>
          <option value="hooded-dim">Lumière faible</option>
          <option value="hooded-bright">Lumière vive</option>
        </select>
      </div>
    </form>
    `,
  buttons: {
    yes: {
      icon: "<i class='fas fa-check'></i>",
      label: `Appliquer`,
      callback: () => applyChanges = true
    },
    no: {
      icon: "<i class='fas fa-times'></i>",
      label: `Annuler`
    },
  },
  default: "yes",
  close: html => {
    if (applyChanges) {
      for ( let token of canvas.tokens.controlled ) {
        let lightSource = html.find('[name="light-source"]')[0].value || "none";
        let dimSight = 0;
        let brightSight = 0;
        let dimLight = 0;
        let brightLight = 0;
        let lightAngle = 360;
        let lockRotation = token.data.lockRotation;
        switch (lightSource) {
          case "hooded-dim":
            dimLight = 1;
            brightLight = 0;
            macro.execute("Huile",true);
            break;
          case "hooded-bright":
            dimLight = 12;
            brightLight = 6;
            macro.execute("Huile",true);
            break;
          case "none":
            dimLight = 0;
            brightLight = 0;
            break;
        }
        console.log(token);
        token.update({
          vision: true,
          dimLight: dimLight,
          brightLight:  brightLight,
          lightAngle: lightAngle,
          lockRotation: lockRotation
        });
      }
    }
  }
}).render(true);
