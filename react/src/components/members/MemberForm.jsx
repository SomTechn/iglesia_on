import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Upload, X } from 'lucide-react'
import Input from '../common/Input'
import Button from '../common/Button'
import Modal from '../common/Modal'

const MemberForm = ({ member, onSave, onClose, isOpen }) => {
  const [photoFile, setPhotoFile] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(member?.foto_url || null)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: member || {},
  })

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPhotoFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data) => {
    setLoading(true)
    await onSave(data, photoFile)
    setLoading(false)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={member ? 'Editar Miembro' : 'Nuevo Miembro'} size="lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Foto */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-gray-200 overflow-hidden bg-gray-100">
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Upload className="w-12 h-12" />
                </div>
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-primary-600 rounded-full p-2 cursor-pointer hover:bg-primary-700 transition-colors shadow-lg">
              <Upload className="w-4 h-4 text-white" />
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nombre"
            {...register('nombre', { required: 'El nombre es requerido' })}
            error={errors.nombre?.message}
            required
          />
          <Input
            label="Apellido"
            {...register('apellido', { required: 'El apellido es requerido' })}
            error={errors.apellido?.message}
            required
          />
          <Input
            label="Fecha de Nacimiento"
            type="date"
            {...register('fecha_nacimiento')}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Género
            </label>
            <select
              {...register('genero')}
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Seleccionar...</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </div>
          <Input
            label="Email"
            type="email"
            {...register('email')}
          />
          <Input
            label="Teléfono"
            {...register('telefono')}
          />
          <Input
            label="Celular"
            {...register('celular')}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Estado Civil
            </label>
            <select
              {...register('estado_civil')}
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Seleccionar...</option>
              <option value="soltero">Soltero/a</option>
              <option value="casado">Casado/a</option>
              <option value="divorciado">Divorciado/a</option>
              <option value="viudo">Viudo/a</option>
              <option value="union_libre">Unión Libre</option>
            </select>
          </div>
        </div>

        <Input
          label="Dirección"
          {...register('direccion')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Ciudad"
            {...register('ciudad')}
          />
          <Input
            label="Ocupación"
            {...register('ocupacion')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Notas
          </label>
          <textarea
            {...register('notas')}
            rows="3"
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Información adicional..."
          />
        </div>

        <div className="flex gap-3 justify-end pt-4 border-t">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            loading={loading}
          >
            {member ? 'Actualizar' : 'Guardar'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default MemberForm
