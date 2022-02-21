import db from '../../db/db.js'

export const getFranjaDocente = async (req ,res) => {
    try {
        //const [results, metadata] = await db.query("SELECT * FROM unicen.franja_horaria where id_tipo_usuario=3 ORDER BY hora_inicio");
        const [results, metadata] = await db.query(`
            SELECT fh.id_franja_horaria, (to_char(fh.hora_inicio, 'HH24:MI') || ' - ' ||
                    to_char(fh.hora_fin, 'HH24:MI')) AS horario
            FROM unicen.franja_horaria fh
            WHERE fh.id_tipo_usuario=3
            ORDER BY hora_inicio`);

        res.json(results);
    } catch (error) {
        res.json({message: `Error al cargar franjas`});
        console.log(error);
    }
}
export const getFranjaHorariaDocenteDeterminado = async (req, res) => {
    try {
        let id_personal = req.params.id_personal
        let id_gestion = req.params.id_gestion
        //const [results, metadata] = await db.query("SELECT * FROM unicen.franja_horaria where id_tipo_usuario=3 ORDER BY hora_inicio");
        const [results, metadata] = await db.query(`
        SELECT cod_carrera, 
        id_materia, 
        cod_materia, 
        grupo, 
        id_asignacion, 
        id_grupo, 
        id_aula, 
        id_franja_horaria, 
        id_dia, 
        id_gestion, 
        id_personal,
        string_agg((cod_materia::text || '-'::text) || ('G-'::text || grupo::text), ', '::text) AS grupos,
        nombre,
        aula
        FROM unicen.v_horario_docente
        WHERE 
        id_personal='${id_personal}' and
        id_gestion='${id_gestion}'
        GROUP BY cod_carrera, id_materia, cod_materia, grupo, id_asignacion, id_grupo, id_aula, id_franja_horaria, id_dia, id_gestion, id_personal, nombre, aula
            `);

        res.json(results);
    } catch (error) {
        res.json({message: `Error al cargar las franjas`});
        console.log(error);
    }
}