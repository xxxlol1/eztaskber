import { getConnection, sql } from "../database";


//-------------------------------------------------------------------------------------------------------------------------------------------
const regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
const regex_t = /^([0-9]+)$/;
//------------------------------ agregar ------------------------------

export const createNewUser = async(req, res) => {
  const{nombre, telefono, email, contraseña} = req.body;
  
  var quantity = 20;
  
  //validacion
  if(telefono == null || nombre == null ||  contraseña == null || email == null
    || !regex.test(email)
    || (telefono.toString()).length != 8  
    || contraseña.length<5
    ||  !regex_t.test(telefono) ){
      return res.json({status:400 , msg: "Bad Reques"});

  }



  try{
      const pool = await getConnection();

       const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .input("telefono", sql.Int, telefono)
      .input("quantity", sql.Int, quantity)
      .query("Select telefono From usuario Where email = @email or telefono = @telefono");

      if(result.recordset.length != 0){
        return res.json({status:400 , msg: "teléfono o email ya existente"});
      }

      
      await pool
      .request()
      .input("nombre", sql.VarChar, nombre)
      .input("telefono", sql.Int, telefono)
      .input("email", sql.VarChar, email)
      .input("contraseña", sql.VarChar, contraseña)
      .input("quantity", sql.Int, quantity)
      .query(" INSERT INTO usuario (telefono,nombre,email,contraseña) VALUES (@telefono,@nombre,@email,@contraseña); ");

    return res.json({ status: 1, msg: "usuario insertado satisfactoriamente" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
  
};

export const createNewTrabajador = async(req, res) => {
  const{nombre, telefono, email, contraseña, dpi, cv, antecedentes} = req.body;
  console.log(req.body );
  console.log(contraseña);
  var quantity = 20;
  
  //validacion
  if(telefono == null || nombre == null ||  contraseña == null || email == null || dpi==null || cv == null || antecedentes == null
    || !regex.test(email)
    || (telefono.toString()).length != 8  
    || contraseña.length<5
    ||  !regex_t.test(telefono) 
      ){
      return res.json({status: 400 ,msg: "Bad Reques"});

  }



  try{
      const pool = await getConnection();

       const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .input("telefono", sql.Int, telefono)
      .input("quantity", sql.Int, quantity)
      .query("Select telefono From trabajador Where email = @email or telefono = @telefono ");

      if(result.recordset.length != 0){
        return res.json({status: 400 ,msg: "teléfono o email  ya existente"});
      }

      var quantity = 100;
      const result2 =await pool
      .request()
      .input("nombre", sql.VarChar, nombre)
      .input("telefono", sql.Int, telefono)
      .input("email", sql.VarChar, email)
      .input("contraseña", sql.VarChar, contraseña)
      .input("dpi", sql.VarChar, dpi)
      .input("cv", sql.VarChar, cv)
      .input("antecedentes", sql.VarChar, antecedentes)
      .input("quantity", sql.Int, quantity)
      .query("INSERT INTO trabajador (telefono,nombre,email,contraseña, dpi, cv, antecedentes) VALUES (@telefono,@nombre,@email,@contraseña, @dpi, @cv, @antecedentes);");
      
    return res.json({ status: 1, msg: "trabajador insertado satisfactoriamente" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
  
};

export const CreateNewFeedBack = async(req, res)=>{
  const { id_p, id_u, id_t, califiacion, comentarios} = req.body;
  const quantity = 20;
  if(id_p == null || id_u == null || id_t == null || califiacion == null || comentarios == null
    || !regex_t.test(id_p) || !regex_t.test(id_u) || !regex_t.test(id_t) || !regex_t.test(califiacion)  ){
      return res.json({status: 400 ,msg: "Bad Reques"});
    }
    try{
      const pool = await getConnection();
      await pool
      .request()
      .input("id_p", sql.Int, id_p)
      .input("id_u", sql.Int, id_u)
      .input("id_t", sql.Int, id_t)
      .input("califiacion", sql.Int, califiacion)
      .input("comentarios", sql.VarChar, comentarios)
      .input("quantity", sql.Int, quantity)
      .query("INSERT INTO feedback (id_p, id_u, id_t, califiacion, comentarios) VALUES (@id_p, @id_u, @id_t, @califiacion, @comentarios) ");
      return res.json({status: 1,msg: "Insertado satisfactoriamente"});
      
    }catch(error){
      res.status(500);
      res.send(error.message);
    }

}

export const CreateNewService = async(req, res) =>{
  const{servicio, descripcion} = req.body;
  var quantity= 20;
  if(servicio == null || descripcion == null){
    return res.json({status: 400 ,msg: "Bad Reques"});
  }
  try{
    const pool = await getConnection();
    const result = await pool
    .request()
    .input("servicio", sql.VarChar, servicio)
    .input("descripcion", sql.VarChar, descripcion)
    .input("quantity", sql.Int, quantity)
    .query("Insert INTO servicios (nombre ,descripcion) VALUES (@servicio, @descripcion);");
    return res.json({msg: "Insertado correctamente", result: result});

  }
  catch(error){
  res.status(500);
  res.send(error.message);

  }


}

export const CreateNewLugar = async(req, res) =>{
  const{zona} = req.body;
  var quantity = 20;
  if(zona == null || !regex_t.test(zona)){
    return res.json({status: 400 ,msg: "Bad Reques"});
  }

  try{
    const pool = await getConnection();
    const result = await pool
    .request()
    .input("zona", sql.Int, zona)
    .input("quantity", sql.Int, quantity)
    .query("INSERT INTO lugar (zona) VALUES (@zona);")
    return res.json({status:1 ,msg: "Ingresado correctamente"});

  }catch(error){
    res.status(500);
    res.send(error.message);
  }

}

export const CreateNewTrabaja_en =  async(req, res) =>{
  const {id_l, id_t } = req.body;
  var quantity = 20;
  if(id_l == null || id_t==null
    || !regex_t.test(id_l) || !regex_t.test(id_t))
    {
      return res.json({status: 400 ,msg: "Bad Reques"});
    }

  try{

    const pool = await getConnection();
    await pool
    .request()
    .input("id_l", sql.Int, id_l)
    .input("id_t", sql.Int, id_t)
    .input("quantity", sql.Int, quantity)
    .query("INSERT INTO trabajador_en (id_t, id_l) VALUES (@id_t, @id_l);");

    return res.json({status:1,msg: "Ingresado correctamente"});
  }catch(error){
    res.status(500);
    res.send(error.message);
  }

}

export const CreateNewRegistrado = async(req, res) =>{
  const{id_t, id_s} = req.body;
  var quantity = 20;

  if(id_t == null || id_s == null 
    || !regex_t.test(id_t) || !regex_t.test(id_s)){
      return res.json({status: 400 ,msg: "Bad Reques"});
    }
  try{
    const pool = await getConnection();
    await pool
    .request()
    .input("id_t", sql.Int, id_t)
    .input("id_s", sql.Int, id_s)
    .input("quantity", sql.Int, quantity)
    .query(" INSERT INTO registrados (id_t, id_s) VALUES (@id_t, @id_s);");
    return res.json({status:1,msg:"Insertado Satisfactoriamente"});
    
  }catch(error){
    res.status(500);
    res.send(error.message);
  }
}

export const CreateNewPeticion = async(req, res) => {
  const {id_u ,id_t ,id_s ,nombre ,descripcion ,lugar ,telefono_u  } = req.body;
  var quantity = 20;

  console.log(req.body);
  console.log( (telefono_u.toString()).length);

  if(id_u == null || id_t == null || id_s == null || nombre == null || descripcion == null || lugar == null || telefono_u == null || 
    !regex_t.test(id_u) || !regex_t.test(id_t) || !regex_t.test(id_s) || !regex_t.test(telefono_u) 
    || (telefono_u.toString()).length != 8 ){
      return res.json({status: 400 ,msg: "Bad Reques"});
  }
  try{
    const pool = await getConnection();
    await pool
    .request()
    .input("id_u", sql.Int, id_u)
    .input("id_t",sql.Int, id_t)
    .input("id_s",sql.Int, id_s)
    .input("nombre", sql.VarChar,  nombre)
    .input("descripcion",sql.VarChar, descripcion)
    .input("lugar", sql.VarChar, lugar)
    .input("telefono_u", sql.Int, telefono_u)
    .input("quantity", sql.Int, quantity)
    .query("INSERT INTO peticion (id_u ,id_t ,id_s ,nombre ,descripcion ,lugar ,telefono_u,estado_t,estado_u  ) VALUES (@id_u ,@id_t ,@id_s ,@nombre ,@descripcion ,@lugar ,@telefono_u ,'P','P') ");
    return res.json({ status:1,msg: "Insertado Satisfactoriamente"});
  }catch(error){
    res.status(500);
    res.send(error.message);
  }

}


//------------------------------ eliminar ------------------------------

//------------------------------ editar ------------------------------
export const ChangeStateUser = async(req, res) =>{
  const{id_p, estado_u} = req.body;
  const quantity = 30;



  if(id_p == null || estado_u == null 
  ||  (estado_u.toString().substring(0,1) != 'P'
  &&  estado_u.toString().substring(0,1) != 'F' 
  &&  estado_u.toString().substring(0,1) != 'C')  ){
    return res.json({status: 400 ,msg: "Bad Reques"});
  }

  try{
  
  const estado = estado_u.toString().substring(0,1);
  const pool = await getConnection();
  const exist = await pool
  .request()
  .input("id_p", sql.Int, id_p)
  .input("quantity", sql.Int, quantity)
  .query("Select id_p From peticion where id_p = @id_p");

  if(exist.recordset.length == 0){
    return res.json({status: 400 ,msg: "No existe la petición"});
  }

  await pool
  .request()
  .input("id_p", sql.Int, id_p)
  .input("estado_u", sql.VarChar, estado)
  .input("quantity", sql.Int, quantity)
  .query("UPDATE peticion SET estado_u = @estado_u WHERE id_p = @id_p");

  return res.json({status: 1,msg: "Fue actualizado correctamente"});

  
  }catch(error){
    res.status(500);
    res.send(error.message);
  }
  

}

export const ChangeStateTrabajador = async(req, res) =>{
  const{id_p, estado_t}= req.body;
  const quantity = 30;

  if(id_p == null || estado_t == null){
    return res.json({status: 400 ,msg: "Bad Reques"});

  }

  try{

    const pool = await getConnection();
    const exist = await pool
    .request()
    .input("id_p", sql.Int, id_p)
    .input("quantity", sql.Int, quantity)
    .query("Select id_p From peticion where id_p = @id_p");
  
    if(exist.recordset.length == 0){
      return res.json({status: 400 ,msg: "No existe la petición"});
    }
  
    await pool
    .request()
    .input("id_p", sql.Int, id_p)
    .input("estado_t", sql.VarChar, estado_t)
    .input("quantity", sql.Int, quantity)
    .query("UPDATE peticion SET estado_t = @estado_t WHERE id_p = @id_p");
  
    return res.json({status: 1,msg: "Fue actualizado correctamente"});


  }catch(error){
    res.status(500);
    res.send(error.message);
  }
  
}
//------------------------------ buscar ------------------------------
export const GetUser = async(req, res) => {
  const{email, contraseña} = req.body;
  
  var quantity = 20;
  
  //validacion
  if(  contraseña == null || email == null
    || !regex.test(email)
    || contraseña.length<5 ){
      return res.json({status: 400 ,msg: "Bad Reques"});

  }



  try{
      const pool = await getConnection();

       const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .input("contraseña", sql.VarChar, contraseña)
      .input("quantity", sql.Int, quantity)
      .query("Select * From usuario Where email = @email and contraseña = @contraseña ");

      if(result.recordset.length == 0){
        return res.json({ status:400, msg: "error en el ingreso de datos"});
      }
      
    return res.json({ status: 1, msg: "bienvenido ", result:result.recordset });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
  
};

export const GetTrabajador = async(req, res) => {
  const{ email, contraseña} = req.body;
  
  var quantity = 20;
  
  //validacion
  if(  contraseña == null || email == null
    || !regex.test(email)
    || contraseña.length<5 ){
      return res.json({status: 400 ,msg: "Bad Reques"});

  }



  try{
      const pool = await getConnection();

       const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .input("contraseña", sql.VarChar, contraseña)
      .input("quantity", sql.Int, quantity)
      .query("Select * From trabajador Where email = @email and contraseña = @contraseña ");

      if(result.recordset.length == 0){
        return res.json({ status:400,msg: "error en el ingreso de datos"});
      }
      
    return res.json({ status: 1, msg: "bienvenido ", result:result.recordset });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
  
};

export const GetLugar = async(req, res) => {
  const{ id_t} = req.body;
  const quantity = 30;
  if(id_t == null || !regex_t.test(id_t)){
    return res.json({status: 400 ,msg: "Bad Reques"});
  }
  try{
    const pool = await getConnection();
    const result = await pool
    .request()
    .input("id_t", sql.Int, id_t)
    .input("quantity", sql.Int, quantity)
    .query("Select id_t , zona From trabajador_en t ,lugar l WHERE t.id_t = @id_t AND t.id_l = l.id_l");

    return res.json({ status:1, msg: "zonas", result: result.recordset });
    
    
    
  }catch(error){
    res.status(500);
    res.send(error.message);
  }
}

export const GetService = async(req, res) => {
  const{id_t} = req.body;
  const quantity = 30;
  if(id_t == null || !regex_t.test(id_t)){
    return res.json({status: 400 ,msg: "Bad Reques"});
  }
  try{
    const pool = await getConnection();
    const result = await pool
    .request()
    .input("id_t", sql.Int, id_t)
    .input("quantity", sql.Int, quantity)
    .query("Select id_t, nombre, descripcion From registrados r ,servicios s WHERE r.id_t = @id_t AND s.id_s = r.id_s");

    return res.json({ status:1, msg: "servicios", result: result.recordset });
    
    
  }catch(error){
  res.status(500);
  res.send(error.message);
  }
}

export const GetPeticion = async(req, res) => {
  const{id_t, id_u} = req.body;
  const quantity = 100;

  if((id_t == null && id_u == null ) || (!regex_t.test(id_t) && !regex_t.test(id_u) ) ){
    return res.json({status: 400 ,msg: "Bad Reques"});

  } 
  try{

  
  const pool = await getConnection();
  var result;
  if(id_t != null && id_t != 0)
  result = await pool
  .request()
  .input("id_t", sql.Int, id_t)
  .input("quantity", sql.Int, quantity)
  .query("Select p.id_p , t.id_t, p.nombre Pnombre, p.descripcion, p.lugar , p.telefono_u, p.estado_t , p.estado_u , t.nombre Tnombre , u.nombre Unombre  from peticion p, usuario u , trabajador t,servicios s where p.id_t = @id_t and  u.id_u = p.id_u and  t.id_t = p.id_t and  p.id_s = s.id_s");

  else
  result = await pool
  .request()
  .input("id_u", sql.Int, id_u)
  .input("quantity", sql.Int, quantity)
  .query("Select p.id_p , t.id_t, p.nombre Pnombre, p.descripcion, p.lugar , p.telefono_u, p.estado_t , p.estado_u , t.nombre Tnombre , u.nombre Unombre  from peticion p, usuario u , trabajador t,servicios s where p.id_u = @id_u and  u.id_u = p.id_u and  t.id_t = p.id_t and  p.id_s = s.id_s");

  return res.json({ status:1, msg: "Peticiones", result: result.recordset});
  }catch(error){
    res.status(500);
    res.send(error.message);
  }

}

export const GetFeedback = async(req, res) =>{
  const{id_t, id_u} = req.body;
  const quantity = 100;

  if((id_t == null && id_u == null ) || (!regex_t.test(id_t) && !regex_t.test(id_u) ) ){
    return res.json({status: 400 ,msg: "Bad Reques"});

  } 
  try{
    const pool = await getConnection();
    var result;
    if(id_t != null && id_t !=0){
      result = await pool
      .request()
      .input("id_t", sql.Int , id_t)
      .input("quantity", sql.Int, quantity)
      .query("Select f.id_f, p.id_p , f.califiacion , f.comentarios , p.nombre Pnombre, t.nombre  Tnombre, u.nombre Unombre from feedback f, usuario u , trabajador t, peticion p where f.id_t = @id_t and u.id_u = f.id_u and   t.id_t = f.id_t  and  p.id_p = f.id_p");


    }
    else{
      result = await pool
      .request()
      .input("id_u", sql.Int , id_u)
      .input("quantity", sql.Int, quantity)
      .query("Select f.id_f, p.id_p , f.califiacion , f.comentarios , p.nombre Pnombre, t.nombre  Tnombre, u.nombre Unombre from feedback f, usuario u , trabajador t, peticion p where f.id_u = @id_u and u.id_u = f.id_u and   t.id_t = f.id_t  and  p.id_p = f.id_p");

    }

    return res.json({ status: 1 , msg: "Feedback", result:result.recordset});

  }catch(error){
    res.status(500);
    res.send(error.message);
  }


}

export const GetTrabajadorLugarService = async(req, res)=>{
  const{id_l, id_s} = req.body;
  const quantity = 30;

  if(id_l == null || id_s== null || !regex_t.test(id_l) || !regex_t.test(id_s) ){
    return res.json({status: 400 ,msg: "Bad Reques"});
  }

  try{
    const pool = await getConnection();
    const result = await pool
    .request()
    .input("id_l", sql.Int, id_l)
    .input("id_S", sql.Int, id_s)
    .input("quantity", sql.Int, quantity)
    .query("Select t.id_t, t.telefono, t.nombre, t.email From trabajador t, lugar l, servicios s, trabajador_en te, registrados r where r.id_s = @id_s and te.id_l = @id_l and l.id_l = te.id_l and s.id_s = r.id_s and t.id_t = te.id_t and t.id_t = r.id_t;");
    
    return res.json({status: 1, msg:"Trabajadores", result:result.recordset});

  }catch(error){
    res.status(500);
    res.send(error.message);
  }
}