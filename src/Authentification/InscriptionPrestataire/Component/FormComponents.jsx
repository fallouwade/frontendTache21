import { regions, departements, commonStyles as styles } from './Constants';

const FormField = ({ label, required, children }) => (
  <div className="mb-4">
    <label className={styles.label}>
      {label}
      {required && <span className={styles.required}>*</span>}
      {!required && <span className={styles.optional}>(Optionnel)</span>}
    </label>
    {children}
  </div>
);

const FileUpload = ({ id, label, required, onChange }) => (
  <FormField label={label} required={required}>
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors">
      <input
        type="file"
        id={id}
        className="hidden"
        multiple
        accept="image/*"
        onChange={onChange}
      />
      <label htmlFor={id} className="cursor-pointer">
        <div className="mx-auto h-12 w-12 text-gray-400">
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <p className="mt-2 text-sm text-gray-600">Cliquez pour ajouter des fichiers</p>
      </label>
    </div>
  </FormField>
);

export const StepIndicator = ({ currentStep }) => (
  <div className="flex justify-between items-center mb-8 max-w-xs mx-auto">
    {[1, 2, 3].map((stepNumber) => (
      <div key={stepNumber} className="flex items-center">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm
            ${currentStep >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
        >
          {stepNumber}
        </div>
        {stepNumber < 3 && (
          <div className={`w-12 h-1 mx-2 ${currentStep > stepNumber ? 'bg-blue-600' : 'bg-gray-200'}`} />
        )}
      </div>
    ))}
  </div>
);

const PersonalInfoForm = ({ formData, setFormData }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <FormField label="Prénom" required>
        <input 
          type="text"
          className={styles.input}
          value={formData.firstName}
          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
          required
        />
      </FormField>
      <FormField label="Nom" required>
        <input 
          type="text"
          className={styles.input}
          value={formData.lastName}
          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
          required
        />
      </FormField>
    </div>
    <FormField label="Email" required>
      <input 
        type="email"
        className={styles.input}
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
      />
    </FormField>
    <FormField label="Téléphone" required>
      <input 
        type="tel"
        className={styles.input}
        value={formData.phone}
        onChange={(e) => setFormData({...formData, phone: e.target.value})}
        required
      />
    </FormField>
    <FormField label="Région" required>
      <select 
        className={styles.input}
        value={formData.region}
        onChange={(e) => setFormData({...formData, region: e.target.value, departement: ''})}
        required
      >
        <option value="">Sélectionnez une région</option>
        {regions.map((region) => (
          <option key={region} value={region}>{region}</option>
        ))}
      </select>
    </FormField>
    {formData.region && (
      <FormField label="Département" required>
        <select 
          className={styles.input}
          value={formData.departement}
          onChange={(e) => setFormData({...formData, departement: e.target.value})}
          required
        >
          <option value="">Sélectionnez un département</option>
          {departements[formData.region]?.map((dept) => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </FormField>
    )}
  </div>
);

const ServiceInfoForm = ({ formData, setFormData, serviceCategories }) => (
  <div className="space-y-4">
    <FormField label="Nom du service" required>
      <input 
        type="text"
        className={styles.input}
        value={formData.serviceName}
        onChange={(e) => setFormData({...formData, serviceName: e.target.value})}
        required
        placeholder="Ex: Plomberie d'urgence 24/7"
      />
    </FormField>
    
    <FormField label="Nom d'entreprise" required>
      <input 
        type="text"
        className={styles.input}
        value={formData.nameEntreprise}
        onChange={(e) => setFormData({...formData, nomEntreprise: e.target.value})}
        required
      />
    </FormField>
    
    <FormField label="Catégorie" required>
      <select 
        className={styles.input}
        value={formData.serviceCategory}
        onChange={(e) => setFormData({...formData, serviceCategory: e.target.value})}
        required
      >
        <option value="">Sélectionnez une catégorie</option>
        {serviceCategories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </FormField>

    <FormField label="Description" required>
      <textarea 
        className={`${styles.input} h-32`}
        value={formData.description}
        onChange={(e) => setFormData({...formData, description: e.target.value})}
        placeholder="Décrivez en détail votre service..."
        required
      />
    </FormField>

    <FormField label="Prix" required>
      <input 
        type="number"
        className={styles.input}
        value={formData.prix}
        onChange={(e) => setFormData({...formData, prix: e.target.value})}
        required
        placeholder="Prix"
      />
    </FormField>

    {/* <FormField label="Zone d'intervention" required>
      <input 
        type="text"
        className={styles.input}
        value={formData.serviceArea}
        onChange={(e) => setFormData({...formData, serviceArea: e.target.value})}
        required
        placeholder="Ex: Rayon de 30km autour de Paris"
      />
    </FormField> */}
  </div>
);

const DocumentsForm = ({ formData, setFormData, handleFileUpload }) => (
  <div className="space-y-4">
    <FileUpload
      id="portfolio"
      label="Photos"
      required={true}
      onChange={(e) => handleFileUpload(e, 'portfolio')}
    />

    <FileUpload
      id="diplome"
      label="Diplômes ou certifications"
      required={false}
      onChange={(e) => handleFileUpload(e, 'diplome')}
    />

    <div className="mt-6">
      <label className="flex items-start space-x-2 cursor-pointer">
        <input
          type="checkbox"
          className="mt-1"
          checked={formData.termsAccepted}
          onChange={(e) => setFormData({...formData, termsAccepted: e.target.checked})}
          required
        />
        <span className="text-sm text-gray-600">
          J'accepte les conditions générales du service
        </span>
      </label>
    </div>
  </div>
);

export const FormComponents = ({ step, formData, setFormData, serviceCategories, handleFileUpload }) => {
  switch(step) {
    case 1:
      return <PersonalInfoForm formData={formData} setFormData={setFormData} />;
    case 2:
      return <ServiceInfoForm formData={formData} setFormData={setFormData} serviceCategories={serviceCategories} />;
    case 3:
      return <DocumentsForm formData={formData} setFormData={setFormData} handleFileUpload={handleFileUpload} />;
    default:
      return null;
  }
};