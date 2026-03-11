export const generateTable = <T>( data: T[], columns: { key: keyof T; label: string }[], title?: string ) => {

  const headers = columns
    .map(col => `<th>${col.label}</th>`)
    .join("")

  const rows = data
    .map(item => {
      const cells = columns
        .map(col => `<td>${item[col.key] ?? ""}</td>`)
        .join("")

      return `<tr>${cells}</tr>`
    })
    .join("")

  return `
  ${title ? `<h3>${title}</h3>` : ""}

  <table border="1" cellpadding="8" cellspacing="0"
    style="border-collapse: collapse; font-family: Arial; font-size:14px;">

    <thead>
      <tr>
        ${headers}
      </tr>
    </thead>

    <tbody>
      ${rows}
    </tbody>

  </table>
  <br/>
  `
}