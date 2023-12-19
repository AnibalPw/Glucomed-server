


const Glucosa = require('../models/PruebaGlucosa');
// const Usuario = require('../models/Usuario');


const listaResultados = async (req, res) => {

    const {uid, name} = req;
    // console.log('req.name', req.name)
    try {
        

        const populateQuery = [ 
            {path:'usario', select:'nombre apellido'}, 
        ];
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 0, 0);


        const glucosa = await Glucosa.find({
            createdAt: { $gte: startOfDay, $lt: endOfDay },
          }).sort({ updatedAt: 1 });

        // const glucosa = await Glucosa.find().sort({ updatedAt: 1 })
        // .populate( populateQuery ).sort( { updatedAt: 1 } )
        
        // .select(selectQuery)
        // const blogs = await Blogs.find().populate('author','name');

        res.status(200).json({
            ok: true,
            result: glucosa
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Por favor ponerse en contacto con el administrador'
        });
    }
}

const ultimaPrueba = async (req, res) => {
    const { uid, name } = req;

    try {
        const populateQuery = [{ path: 'usuario', select: 'nombre apellido' }];

        const ultimaGlucosa = await Glucosa.findOne().sort({ updatedAt: -1 })//.populate(populateQuery);

        res.status(200).json({
            ok: true,
            result: ultimaGlucosa
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor ponerse en contacto con el administrador'
        });
    }
}

const listaResultadosMesActual = async (req, res) => {
    try {
      const { uid, name } = req;
      const today = new Date();
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  
      const populateQuery = [
        { path: 'usuario', select: 'nombre apellido' },
      ];
  
      const glucosa = await Glucosa.find({
        createdAt: { $gte: firstDayOfMonth },
      }).sort({ updatedAt: 1 });
  
      res.status(200).json({
        ok: true,
        result: glucosa,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Por favor ponerse en contacto con el administrador',
      });
    }
  };
  
  const listaResultadosDiaActual = async (req, res) => {
    try {
        const { uid, name } = req;
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 0, 0);
    
        const populateQuery = [
          { path: 'usuario', select: 'nombre apellido' },
        ];
    
        const glucosa = await Glucosa.find({
          createdAt: { $gte: startOfDay, $lt: endOfDay },
        }).sort({ updatedAt: 1 });
    
        console.log('glucosa :>> ', glucosa);
        res.status(200).json({
          ok: true,
          result: glucosa,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          ok: false,
          msg: 'Por favor ponerse en contacto con el administrador',
        });
      }
  };

const guardarGlucosa = async (req, res) => {

    const glucosa = new Glucosa( req.body );
    
    try {
        glucosa.idUsuario = 1;//req.uid;
        
        const glucosaGuardada = await glucosa.save(); 

        res.status(200).json({
            ok: true,
            glucosa: glucosaGuardada,
            msg: 'Niveles de glucosa guardados con éxitosamente.'
        })

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Por favor ponerse en contacto con el administrador'
        });
    }
}

module.exports = {
    listaResultados,
    listaResultadosMesActual,
    listaResultadosDiaActual,
    ultimaPrueba,
    guardarGlucosa,
}