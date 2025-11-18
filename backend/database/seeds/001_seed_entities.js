/**
 * Seed File: DGA Government Entities
 * 
 * Seeds 158 Government Entities across 5 regions:
 * - Central Region (Riyadh): 42 entities
 * - Western Region (Jeddah): 38 entities
 * - Eastern Region (Dammam): 28 entities
 * - Northern Region (Tabuk): 24 entities
 * - Southern Region (Abha): 26 entities
 */

const { v4: uuidv4 } = require('uuid');

exports.seed = async function(knex) {
  // Delete existing entries
  await knex('dga_entities').del();

  const entities = [
    // CENTRAL REGION (Riyadh) - 42 Entities
    { code: 'MOI', name_en: 'Ministry of Interior', name_ar: 'وزارة الداخلية', type: 'Ministry', sector: 'Interior', city: 'Riyadh' },
    { code: 'SDAIA', name_en: 'Saudi Data & AI Authority', name_ar: 'الهيئة السعودية للبيانات والذكاء الاصطناعي', type: 'Authority', sector: 'Technology', city: 'Riyadh' },
    { code: 'NCA', name_en: 'National Cybersecurity Authority', name_ar: 'الهيئة الوطنية للأمن السيبراني', type: 'Authority', sector: 'Technology', city: 'Riyadh' },
    { code: 'MOH', name_en: 'Ministry of Health', name_ar: 'وزارة الصحة', type: 'Ministry', sector: 'Health', city: 'Riyadh' },
    { code: 'MOE', name_en: 'Ministry of Education', name_ar: 'وزارة التعليم', type: 'Ministry', sector: 'Education', city: 'Riyadh' },
    { code: 'MOJ', name_en: 'Ministry of Justice', name_ar: 'وزارة العدل', type: 'Ministry', sector: 'Justice', city: 'Riyadh' },
    { code: 'MOC', name_en: 'Ministry of Communications', name_ar: 'وزارة الاتصالات', type: 'Ministry', sector: 'Technology', city: 'Riyadh' },
    { code: 'ZATCA', name_en: 'Zakat, Tax & Customs Authority', name_ar: 'هيئة الزكاة والضريبة والجمارك', type: 'Authority', sector: 'Economy', city: 'Riyadh' },
    { code: 'MHRSD', name_en: 'Ministry of Human Resources & Social Development', name_ar: 'وزارة الموارد البشرية والتنمية الاجتماعية', type: 'Ministry', sector: 'Social Development', city: 'Riyadh' },
    { code: 'CITC', name_en: 'Communications & IT Commission', name_ar: 'هيئة الاتصالات وتقنية المعلومات', type: 'Commission', sector: 'Technology', city: 'Riyadh' },
    { code: 'SAMA', name_en: 'Saudi Central Bank', name_ar: 'البنك المركزي السعودي', type: 'Authority', sector: 'Economy', city: 'Riyadh' },
    { code: 'CMA', name_en: 'Capital Market Authority', name_ar: 'هيئة السوق المالية', type: 'Authority', sector: 'Economy', city: 'Riyadh' },
    { code: 'MOF', name_en: 'Ministry of Finance', name_ar: 'وزارة المالية', type: 'Ministry', sector: 'Economy', city: 'Riyadh' },
    { code: 'GAM', name_en: 'General Authority for Statistics', name_ar: 'الهيئة العامة للإحصاء', type: 'Authority', sector: 'Other', city: 'Riyadh' },
    { code: 'GAEU', name_en: 'General Authority for Entertainment', name_ar: 'الهيئة العامة للترفيه', type: 'Authority', sector: 'Culture', city: 'Riyadh' },
    { code: 'MOT', name_en: 'Ministry of Transport', name_ar: 'وزارة النقل', type: 'Ministry', sector: 'Transport', city: 'Riyadh' },
    { code: 'GACA', name_en: 'General Authority of Civil Aviation', name_ar: 'الهيئة العامة للطيران المدني', type: 'Authority', sector: 'Transport', city: 'Riyadh' },
    { code: 'PPA', name_en: 'Public Prosecution Authority', name_ar: 'النيابة العامة', type: 'Authority', sector: 'Justice', city: 'Riyadh' },
    { code: 'NCCC', name_en: 'National Center for Cybersecurity', name_ar: 'المركز الوطني للأمن السيبراني', type: 'Center', sector: 'Technology', city: 'Riyadh' },
    { code: 'RCJY', name_en: 'Royal Commission for Riyadh City', name_ar: 'الهيئة الملكية لمدينة الرياض', type: 'Commission', sector: 'Other', city: 'Riyadh' },
    { code: 'MOM', name_en: 'Ministry of Municipalities', name_ar: 'وزارة الشؤون البلدية', type: 'Ministry', sector: 'Other', city: 'Riyadh' },
    { code: 'SFDA', name_en: 'Saudi Food & Drug Authority', name_ar: 'الهيئة العامة للغذاء والدواء', type: 'Authority', sector: 'Health', city: 'Riyadh' },
    { code: 'ETEC', name_en: 'Education & Training Evaluation Commission', name_ar: 'هيئة تقويم التعليم والتدريب', type: 'Commission', sector: 'Education', city: 'Riyadh' },
    { code: 'HRDF', name_en: 'Human Resources Development Fund', name_ar: 'صندوق تنمية الموارد البشرية', type: 'Authority', sector: 'Social Development', city: 'Riyadh' },
    { code: 'SABIC', name_en: 'Saudi Basic Industries Corporation', name_ar: 'الشركة السعودية للصناعات الأساسية', type: 'Corporation', sector: 'Economy', city: 'Riyadh' },
    { code: 'GOSI', name_en: 'General Organization for Social Insurance', name_ar: 'المؤسسة العامة للتأمينات الاجتماعية', type: 'Authority', sector: 'Social Development', city: 'Riyadh' },
    { code: 'NCM', name_en: 'National Center of Meteorology', name_ar: 'المركز الوطني للأرصاد', type: 'Center', sector: 'Environment', city: 'Riyadh' },
    { code: 'SCTH', name_en: 'Saudi Commission for Tourism & Heritage', name_ar: 'هيئة السياحة والتراث الوطني', type: 'Commission', sector: 'Tourism', city: 'Riyadh' },
    { code: 'SAGIA', name_en: 'Saudi Arabian General Investment Authority', name_ar: 'الهيئة العامة للاستثمار', type: 'Authority', sector: 'Economy', city: 'Riyadh' },
    { code: 'MOEnergy', name_en: 'Ministry of Energy', name_ar: 'وزارة الطاقة', type: 'Ministry', sector: 'Energy', city: 'Riyadh' },
    { code: 'MEWA', name_en: 'Ministry of Environment, Water & Agriculture', name_ar: 'وزارة البيئة والمياه والزراعة', type: 'Ministry', sector: 'Environment', city: 'Riyadh' },
    { code: 'KSU', name_en: 'King Saud University', name_ar: 'جامعة الملك سعود', type: 'Authority', sector: 'Education', city: 'Riyadh' },
    { code: 'KFSHRC', name_en: 'King Faisal Specialist Hospital', name_ar: 'مستشفى الملك فيصل التخصصي', type: 'Authority', sector: 'Health', city: 'Riyadh' },
    { code: 'KACST', name_en: 'King Abdulaziz City for Science & Technology', name_ar: 'مدينة الملك عبدالعزيز للعلوم والتقنية', type: 'Authority', sector: 'Technology', city: 'Riyadh' },
    { code: 'SPA', name_en: 'Saudi Press Agency', name_ar: 'وكالة الأنباء السعودية', type: 'Agency', sector: 'Culture', city: 'Riyadh' },
    { code: 'MOCulture', name_en: 'Ministry of Culture', name_ar: 'وزارة الثقافة', type: 'Ministry', sector: 'Culture', city: 'Riyadh' },
    { code: 'MOFA', name_en: 'Ministry of Foreign Affairs', name_ar: 'وزارة الخارجية', type: 'Ministry', sector: 'Other', city: 'Riyadh' },
    { code: 'MOD', name_en: 'Ministry of Defense', name_ar: 'وزارة الدفاع', type: 'Ministry', sector: 'Defense', city: 'Riyadh' },
    { code: 'SANG', name_en: 'Saudi Arabian National Guard', name_ar: 'الحرس الوطني السعودي', type: 'Authority', sector: 'Defense', city: 'Riyadh' },
    { code: 'SAUDIPOST', name_en: 'Saudi Post', name_ar: 'البريد السعودي', type: 'Corporation', sector: 'Transport', city: 'Riyadh' },
    { code: 'PIF', name_en: 'Public Investment Fund', name_ar: 'صندوق الاستثمارات العامة', type: 'Authority', sector: 'Economy', city: 'Riyadh' },
    { code: 'RCRC', name_en: 'King Salman Humanitarian Aid & Relief Center', name_ar: 'مركز الملك سلمان للإغاثة', type: 'Center', sector: 'Social Development', city: 'Riyadh' },

    // WESTERN REGION (Jeddah) - 38 Entities
    { code: 'MOHJ', name_en: 'Ministry of Hajj & Umrah', name_ar: 'وزارة الحج والعمرة', type: 'Ministry', sector: 'Tourism', city: 'Jeddah' },
    { code: 'JEDDAHMUN', name_en: 'Jeddah Municipality', name_ar: 'أمانة جدة', type: 'Municipality', sector: 'Other', city: 'Jeddah' },
    { code: 'MAWANI', name_en: 'Saudi Ports Authority', name_ar: 'هيئة الموانئ', type: 'Authority', sector: 'Transport', city: 'Jeddah' },
    { code: 'SCTA', name_en: 'Saudi Commission for Tourism & Antiquities', name_ar: 'الهيئة العامة للسياحة والآثار', type: 'Commission', sector: 'Tourism', city: 'Jeddah' },
    { code: 'RCJED', name_en: 'Royal Commission for Jeddah', name_ar: 'الهيئة الملكية لمدينة جدة', type: 'Commission', sector: 'Other', city: 'Jeddah' },
    { code: 'KAU', name_en: 'King Abdulaziz University', name_ar: 'جامعة الملك عبدالعزيز', type: 'Authority', sector: 'Education', city: 'Jeddah' },
    { code: 'KAUH', name_en: 'King Abdulaziz University Hospital', name_ar: 'مستشفى جامعة الملك عبدالعزيز', type: 'Authority', sector: 'Health', city: 'Jeddah' },
    { code: 'JCIA', name_en: 'King Abdulaziz International Airport', name_ar: 'مطار الملك عبدالعزيز الدولي', type: 'Authority', sector: 'Transport', city: 'Jeddah' },
    { code: 'JCHAMBER', name_en: 'Jeddah Chamber of Commerce', name_ar: 'غرفة جدة التجارية', type: 'Authority', sector: 'Economy', city: 'Jeddah' },
    { code: 'REDSEADEV', name_en: 'Red Sea Development Company', name_ar: 'شركة البحر الأحمر للتطوير', type: 'Corporation', sector: 'Tourism', city: 'Jeddah' },
    { code: 'MADINAHDEV', name_en: 'Madinah Development Authority', name_ar: 'هيئة تطوير المدينة المنورة', name_ar: 'هيئة تطوير المدينة', type: 'Authority', sector: 'Other', city: 'Madinah' },
    { code: 'MEKKAHDEV', name_en: 'Makkah Development Authority', name_ar: 'هيئة تطوير مكة المكرمة', type: 'Authority', sector: 'Other', city: 'Makkah' },
    { code: 'HARAMAIN', name_en: 'Haramain High Speed Rail', name_ar: 'قطار الحرمين', type: 'Authority', sector: 'Transport', city: 'Jeddah' },
    { code: 'SAUDIA', name_en: 'Saudi Arabian Airlines', name_ar: 'الخطوط الجوية السعودية', type: 'Corporation', sector: 'Transport', city: 'Jeddah' },
    { code: 'FLYNAS', name_en: 'Flynas Airlines', name_ar: 'طيران ناس', type: 'Corporation', sector: 'Transport', city: 'Jeddah' },
    { code: 'NCBBANK', name_en: 'National Commercial Bank', name_ar: 'البنك الأهلي التجاري', type: 'Corporation', sector: 'Economy', city: 'Jeddah' },
    { code: 'RJBANK', name_en: 'Riyad Bank', name_ar: 'بنك الرياض', type: 'Corporation', sector: 'Economy', city: 'Jeddah' },
    { code: 'SABB', name_en: 'Saudi British Bank', name_ar: 'البنك السعودي البريطاني', type: 'Corporation', sector: 'Economy', city: 'Jeddah' },
    { code: 'JEDDAHPORT', name_en: 'Jeddah Islamic Port', name_ar: 'ميناء جدة الإسلامي', type: 'Authority', sector: 'Transport', city: 'Jeddah' },
    { code: 'WESTHOSPITAL', name_en: 'King Fahad Hospital - Jeddah', name_ar: 'مستشفى الملك فهد بجدة', type: 'Authority', sector: 'Health', city: 'Jeddah' },
    { code: 'WESTEDU', name_en: 'Western Region Education Directorate', name_ar: 'إدارة التعليم بالمنطقة الغربية', type: 'Authority', sector: 'Education', city: 'Jeddah' },
    { code: 'YANBU', name_en: 'Royal Commission for Yanbu', name_ar: 'الهيئة الملكية بينبع', type: 'Commission', sector: 'Energy', city: 'Yanbu' },
    { code: 'TAIFMUN', name_en: 'Taif Municipality', name_ar: 'أمانة الطائف', type: 'Municipality', sector: 'Other', city: 'Taif' },
    { code: 'MADINAHMUN', name_en: 'Madinah Municipality', name_ar: 'أمانة المدينة المنورة', type: 'Municipality', sector: 'Other', city: 'Madinah' },
    { code: 'MEKKAHMUN', name_en: 'Makkah Municipality', name_ar: 'أمانة مكة المكرمة', type: 'Municipality', sector: 'Other', city: 'Makkah' },
    { code: 'ISLAHWELFARE', name_en: 'Islah Welfare Society', name_ar: 'جمعية الإصلاح', type: 'Authority', sector: 'Social Development', city: 'Jeddah' },
    { code: 'WESTWATER', name_en: 'Western Region Water Authority', name_ar: 'هيئة المياه بالمنطقة الغربية', type: 'Authority', sector: 'Environment', city: 'Jeddah' },
    { code: 'WESTPOWER', name_en: 'Western Region Electricity Company', name_ar: 'شركة الكهرباء بالمنطقة الغربية', type: 'Corporation', sector: 'Energy', city: 'Jeddah' },
    { code: 'JEDDAHCUSTOMS', name_en: 'Jeddah Customs', name_ar: 'جمارك جدة', type: 'Authority', sector: 'Economy', city: 'Jeddah' },
    { code: 'CIVILDEFWEST', name_en: 'Civil Defense - Western Region', name_ar: 'الدفاع المدني - المنطقة الغربية', type: 'Authority', sector: 'Interior', city: 'Jeddah' },
    { code: 'REDCRESWEST', name_en: 'Red Crescent - Western Region', name_ar: 'الهلال الأحمر - المنطقة الغربية', type: 'Authority', sector: 'Health', city: 'Jeddah' },
    { code: 'TAIBAHU', name_en: 'Taibah University', name_ar: 'جامعة طيبة', type: 'Authority', sector: 'Education', city: 'Madinah' },
    { code: 'UMMULQURA', name_en: 'Umm Al-Qura University', name_ar: 'جامعة أم القرى', type: 'Authority', sector: 'Education', city: 'Makkah' },
    { code: 'TAIFUNIV', name_en: 'Taif University', name_ar: 'جامعة الطائف', type: 'Authority', sector: 'Education', city: 'Taif' },
    { code: 'HAJJTERMINAL', name_en: 'Hajj Terminal Operations', name_ar: 'عمليات صالة الحجاج', type: 'Authority', sector: 'Tourism', city: 'Jeddah' },
    { code: 'WESTPOLICE', name_en: 'Western Region Police HQ', name_ar: 'شرطة المنطقة الغربية', type: 'Authority', sector: 'Interior', city: 'Jeddah' },
    { code: 'WESTTOURISM', name_en: 'Western Region Tourism Authority', name_ar: 'هيئة السياحة بالمنطقة الغربية', type: 'Authority', sector: 'Tourism', city: 'Jeddah' },
    { code: 'WESTCHAMBER', name_en: 'Western Region Chambers Federation', name_ar: 'اتحاد الغرف بالمنطقة الغربية', type: 'Authority', sector: 'Economy', city: 'Jeddah' },

    // EASTERN REGION (Dammam) - 28 Entities
    { code: 'ARAMCO', name_en: 'Saudi Aramco Digital', name_ar: 'أرامكو السعودية الرقمية', type: 'Corporation', sector: 'Energy', city: 'Dhahran' },
    { code: 'RCJUB', name_en: 'Royal Commission for Jubail & Yanbu', name_ar: 'الهيئة الملكية للجبيل وينبع', type: 'Commission', sector: 'Energy', city: 'Jubail' },
    { code: 'MOEE', name_en: 'Ministry of Energy - Eastern Office', name_ar: 'وزارة الطاقة - المكتب الشرقي', type: 'Ministry', sector: 'Energy', city: 'Dammam' },
    { code: 'SABICEAST', name_en: 'SABIC Eastern Operations', name_ar: 'سابك - العمليات الشرقية', type: 'Corporation', sector: 'Energy', city: 'Jubail' },
    { code: 'KFUPM', name_en: 'King Fahd University of Petroleum & Minerals', name_ar: 'جامعة الملك فهد للبترول والمعادن', type: 'Authority', sector: 'Education', city: 'Dhahran' },
    { code: 'DAMMAMMUN', name_en: 'Dammam Municipality', name_ar: 'أمانة الدمام', type: 'Municipality', sector: 'Other', city: 'Dammam' },
    { code: 'JUBAILMUN', name_en: 'Jubail Municipality', name_ar: 'أمانة الجبيل', type: 'Municipality', sector: 'Other', city: 'Jubail' },
    { code: 'DHAHRANPORT', name_en: 'King Abdulaziz Port - Dammam', name_ar: 'ميناء الملك عبدالعزيز بالدمام', type: 'Authority', sector: 'Transport', city: 'Dammam' },
    { code: 'JUBAILPORT', name_en: 'Jubail Commercial Port', name_ar: 'ميناء الجبيل التجاري', type: 'Authority', sector: 'Transport', city: 'Jubail' },
    { code: 'KFUH', name_en: 'King Fahd University Hospital', name_ar: 'مستشفى جامعة الملك فهد', type: 'Authority', sector: 'Health', city: 'Khobar' },
    { code: 'EASTWATER', name_en: 'Eastern Region Water & Sewage', name_ar: 'المياه والصرف الصحي بالمنطقة الشرقية', type: 'Authority', sector: 'Environment', city: 'Dammam' },
    { code: 'SEC', name_en: 'Saudi Electricity Company - Eastern Region', name_ar: 'الشركة السعودية للكهرباء - المنطقة الشرقية', type: 'Corporation', sector: 'Energy', city: 'Dammam' },
    { code: 'KFUPMHOSP', name_en: 'KFUPM Medical Center', name_ar: 'المركز الطبي لجامعة الملك فهد', type: 'Authority', sector: 'Health', city: 'Dhahran' },
    { code: 'IAU', name_en: 'Imam Abdulrahman Bin Faisal University', name_ar: 'جامعة الإمام عبدالرحمن بن فيصل', type: 'Authority', sector: 'Education', city: 'Dammam' },
    { code: 'EASTCHAMBER', name_en: 'Eastern Province Chamber of Commerce', name_ar: 'غرفة الشرقية', type: 'Authority', sector: 'Economy', city: 'Dammam' },
    { code: 'MAADEN', name_en: 'Saudi Arabian Mining Company', name_ar: 'شركة التعدين العربية السعودية', type: 'Corporation', sector: 'Energy', city: 'Ras Al Khair' },
    { code: 'EASTPOLICE', name_en: 'Eastern Region Police HQ', name_ar: 'شرطة المنطقة الشرقية', type: 'Authority', sector: 'Interior', city: 'Dammam' },
    { code: 'CIVILDEFEAST', name_en: 'Civil Defense - Eastern Region', name_ar: 'الدفاع المدني - المنطقة الشرقية', type: 'Authority', sector: 'Interior', city: 'Dammam' },
    { code: 'REDCRESEAST', name_en: 'Red Crescent - Eastern Region', name_ar: 'الهلال الأحمر - المنطقة الشرقية', type: 'Authority', sector: 'Health', city: 'Dammam' },
    { code: 'EASTEDU', name_en: 'Eastern Region Education Directorate', name_ar: 'إدارة التعليم بالمنطقة الشرقية', type: 'Authority', sector: 'Education', city: 'Dammam' },
    { code: 'KFUHOSPITAL', name_en: 'King Fahd Hospital - Dammam', name_ar: 'مستشفى الملك فهد بالدمام', type: 'Authority', sector: 'Health', city: 'Dammam' },
    { code: 'SCECO', name_en: 'Saudi Consolidated Electric Company', name_ar: 'الشركة السعودية الموحدة للكهرباء', type: 'Corporation', sector: 'Energy', city: 'Dammam' },
    { code: 'PETROCHEM', name_en: 'National Petrochemical Company', name_ar: 'الشركة الوطنية للبتروكيماويات', type: 'Corporation', sector: 'Energy', city: 'Jubail' },
    { code: 'SWCC', name_en: 'Saline Water Conversion Corporation', name_ar: 'المؤسسة العامة لتحلية المياه المالحة', type: 'Corporation', sector: 'Environment', city: 'Jubail' },
    { code: 'BHRI', name_en: 'King Fahd Hospital of the University', name_ar: 'مستشفى الملك فهد الجامعي', type: 'Authority', sector: 'Health', city: 'Khobar' },
    { code: 'EASTTOURISM', name_en: 'Eastern Region Tourism Authority', name_ar: 'هيئة السياحة بالمنطقة الشرقية', type: 'Authority', sector: 'Tourism', city: 'Dammam' },
    { code: 'DHAHRANAIR', name_en: 'King Fahd International Airport', name_ar: 'مطار الملك فهد الدولي', type: 'Authority', sector: 'Transport', city: 'Dammam' },
    { code: 'EASTCUSTOMS', name_en: 'Eastern Region Customs', name_ar: 'جمارك المنطقة الشرقية', type: 'Authority', sector: 'Economy', city: 'Dammam' },

    // NORTHERN REGION (Tabuk) - 24 Entities
    { code: 'NEOM', name_en: 'NEOM Authority', name_ar: 'هيئة نيوم', type: 'Authority', sector: 'Other', city: 'NEOM' },
    { code: 'REDSEAPROJ', name_en: 'Red Sea Project Authority', name_ar: 'هيئة مشروع البحر الأحمر', type: 'Authority', sector: 'Tourism', city: 'Tabuk' },
    { code: 'TABUKMUN', name_en: 'Tabuk Municipality', name_ar: 'أمانة تبوك', type: 'Municipality', sector: 'Other', city: 'Tabuk' },
    { code: 'NORTHPOLICE', name_en: 'Northern Region Police HQ', name_ar: 'شرطة المنطقة الشمالية', type: 'Authority', sector: 'Interior', city: 'Tabuk' },
    { code: 'BORDERGUARD', name_en: 'Border Guard - Northern Sector', name_ar: 'حرس الحدود - القطاع الشمالي', type: 'Authority', sector: 'Defense', city: 'Tabuk' },
    { code: 'TABUKUNI', name_en: 'Tabuk University', name_ar: 'جامعة تبوك', type: 'Authority', sector: 'Education', city: 'Tabuk' },
    { code: 'JOUFUNI', name_en: 'Al-Jouf University', name_ar: 'جامعة الجوف', type: 'Authority', sector: 'Education', city: 'Al-Jouf' },
    { code: 'NORTHERNBORDER', name_en: 'Northern Border University', name_ar: 'جامعة الحدود الشمالية', type: 'Authority', sector: 'Education', city: 'Arar' },
    { code: 'TABUKHOSPITAL', name_en: 'King Fahd Specialist Hospital - Tabuk', name_ar: 'مستشفى الملك فهد التخصصي بتبوك', type: 'Authority', sector: 'Health', city: 'Tabuk' },
    { code: 'NORTHWATER', name_en: 'Northern Region Water Authority', name_ar: 'هيئة المياه بالمنطقة الشمالية', type: 'Authority', sector: 'Environment', city: 'Tabuk' },
    { code: 'NORTHPOWER', name_en: 'Northern Region Electricity Company', name_ar: 'شركة الكهرباء بالمنطقة الشمالية', type: 'Corporation', sector: 'Energy', city: 'Tabuk' },
    { code: 'NORTHEDU', name_en: 'Northern Region Education Directorate', name_ar: 'إدارة التعليم بالمنطقة الشمالية', type: 'Authority', sector: 'Education', city: 'Tabuk' },
    { code: 'CIVILDEFNORTH', name_en: 'Civil Defense - Northern Region', name_ar: 'الدفاع المدني - المنطقة الشمالية', type: 'Authority', sector: 'Interior', city: 'Tabuk' },
    { code: 'REDCRESNORTH', name_en: 'Red Crescent - Northern Region', name_ar: 'الهلال الأحمر - المنطقة الشمالية', type: 'Authority', sector: 'Health', city: 'Tabuk' },
    { code: 'NORTHCHAMBER', name_en: 'Tabuk Chamber of Commerce', name_ar: 'غرفة تبوك التجارية', type: 'Authority', sector: 'Economy', city: 'Tabuk' },
    { code: 'TABUKAIRPORT', name_en: 'Tabuk Regional Airport', name_ar: 'مطار تبوك الإقليمي', type: 'Authority', sector: 'Transport', city: 'Tabuk' },
    { code: 'NORTHAGRI', name_en: 'Northern Region Agriculture Directorate', name_ar: 'إدارة الزراعة بالمنطقة الشمالية', type: 'Authority', sector: 'Environment', city: 'Tabuk' },
    { code: 'NEOMTECH', name_en: 'NEOM Tech & Digital Company', name_ar: 'شركة نيوم للتقنية والرقمنة', type: 'Corporation', sector: 'Technology', city: 'NEOM' },
    { code: 'NORTHTOURISM', name_en: 'Northern Region Tourism Authority', name_ar: 'هيئة السياحة بالمنطقة الشمالية', type: 'Authority', sector: 'Tourism', city: 'Tabuk' },
    { code: 'JOUFMUN', name_en: 'Al-Jouf Municipality', name_ar: 'أمانة الجوف', type: 'Municipality', sector: 'Other', city: 'Al-Jouf' },
    { code: 'ARARMUN', name_en: 'Arar Municipality', name_ar: 'أمانة عرعر', type: 'Municipality', sector: 'Other', city: 'Arar' },
    { code: 'NORTHCUSTOMS', name_en: 'Northern Region Customs', name_ar: 'جمارك المنطقة الشمالية', type: 'Authority', sector: 'Economy', city: 'Tabuk' },
    { code: 'NEOMHEALTH', name_en: 'NEOM Health Services', name_ar: 'خدمات نيوم الصحية', type: 'Authority', sector: 'Health', city: 'NEOM' },
    { code: 'NORTHDEV', name_en: 'Northern Region Development Authority', name_ar: 'هيئة تطوير المنطقة الشمالية', type: 'Authority', sector: 'Other', city: 'Tabuk' },

    // SOUTHERN REGION (Abha) - 26 Entities
    { code: 'ABHAMUN', name_en: 'Abha Municipality', name_ar: 'أمانة أبها', type: 'Municipality', sector: 'Other', city: 'Abha' },
    { code: 'KKU', name_en: 'King Khalid University', name_ar: 'جامعة الملك خالد', type: 'Authority', sector: 'Education', city: 'Abha' },
    { code: 'SOUTHPOLICE', name_en: 'Southern Region Police HQ', name_ar: 'شرطة المنطقة الجنوبية', type: 'Authority', sector: 'Interior', city: 'Abha' },
    { code: 'ASIRDEV', name_en: 'Asir Development Authority', name_ar: 'هيئة تطوير منطقة عسير', type: 'Authority', sector: 'Other', city: 'Abha' },
    { code: 'SOUTHWATER', name_en: 'Southern Region Water Authority', name_ar: 'هيئة المياه بالمنطقة الجنوبية', type: 'Authority', sector: 'Environment', city: 'Abha' },
    { code: 'SOUTHPOWER', name_en: 'Southern Region Electricity Company', name_ar: 'شركة الكهرباء بالمنطقة الجنوبية', type: 'Corporation', sector: 'Energy', city: 'Abha' },
    { code: 'ABHAAIRPORT', name_en: 'Abha Regional Airport', name_ar: 'مطار أبها الإقليمي', type: 'Authority', sector: 'Transport', city: 'Abha' },
    { code: 'KKUHOSPITAL', name_en: 'King Khalid University Hospital', name_ar: 'مستشفى جامعة الملك خالد', type: 'Authority', sector: 'Health', city: 'Abha' },
    { code: 'SOUTHHEALTH', name_en: 'Southern Region Health Directorate', name_ar: 'الشؤون الصحية بالمنطقة الجنوبية', type: 'Authority', sector: 'Health', city: 'Abha' },
    { code: 'SOUTHEDU', name_en: 'Southern Region Education Directorate', name_ar: 'إدارة التعليم بالمنطقة الجنوبية', type: 'Authority', sector: 'Education', city: 'Abha' },
    { code: 'CIVILDEFSOUTH', name_en: 'Civil Defense - Southern Region', name_ar: 'الدفاع المدني - المنطقة الجنوبية', type: 'Authority', sector: 'Interior', city: 'Abha' },
    { code: 'REDCRESSOUTH', name_en: 'Red Crescent - Southern Region', name_ar: 'الهلال الأحمر - المنطقة الجنوبية', type: 'Authority', sector: 'Health', city: 'Abha' },
    { code: 'SOUTHCHAMBER', name_en: 'Asir Chamber of Commerce', name_ar: 'غرفة عسير التجارية', type: 'Authority', sector: 'Economy', city: 'Abha' },
    { code: 'SOUTHTOURISM', name_en: 'Southern Region Tourism Authority', name_ar: 'هيئة السياحة بالمنطقة الجنوبية', type: 'Authority', sector: 'Tourism', city: 'Abha' },
    { code: 'NAJRANMUN', name_en: 'Najran Municipality', name_ar: 'أمانة نجران', type: 'Municipality', sector: 'Other', city: 'Najran' },
    { code: 'JAIZANMUN', name_en: 'Jazan Municipality', name_ar: 'أمانة جازان', type: 'Municipality', sector: 'Other', city: 'Jazan' },
    { code: 'BAHAMUN', name_en: 'Al-Baha Municipality', name_ar: 'أمانة الباحة', type: 'Municipality', sector: 'Other', city: 'Al-Baha' },
    { code: 'NAJRANUNI', name_en: 'Najran University', name_ar: 'جامعة نجران', type: 'Authority', sector: 'Education', city: 'Najran' },
    { code: 'JAIZANUNI', name_en: 'Jazan University', name_ar: 'جامعة جازان', type: 'Authority', sector: 'Education', city: 'Jazan' },
    { code: 'BAHAUNI', name_en: 'Al-Baha University', name_ar: 'جامعة الباحة', type: 'Authority', sector: 'Education', city: 'Al-Baha' },
    { code: 'SOUTHAGRI', name_en: 'Southern Region Agriculture Directorate', name_ar: 'إدارة الزراعة بالمنطقة الجنوبية', type: 'Authority', sector: 'Environment', city: 'Abha' },
    { code: 'JAIZANPORT', name_en: 'Jazan Port', name_ar: 'ميناء جازان', type: 'Authority', sector: 'Transport', city: 'Jazan' },
    { code: 'SOUTHCUSTOMS', name_en: 'Southern Region Customs', name_ar: 'جمارك المنطقة الجنوبية', type: 'Authority', sector: 'Economy', city: 'Jazan' },
    { code: 'JAIZANDEV', name_en: 'Jazan Development Authority', name_ar: 'هيئة تطوير منطقة جازان', type: 'Authority', sector: 'Other', city: 'Jazan' },
    { code: 'NAJRANDEV', name_en: 'Najran Development Authority', name_ar: 'هيئة تطوير منطقة نجران', type: 'Authority', sector: 'Other', city: 'Najran' },
    { code: 'BORDERGUARDSOUTH', name_en: 'Border Guard - Southern Sector', name_ar: 'حرس الحدود - القطاع الجنوبي', type: 'Authority', sector: 'Defense', city: 'Jazan' },
  ];

  // Prepare data for insertion
  const data = entities.map((entity, index) => ({
    entity_id: uuidv4(),
    entity_code: entity.code,
    entity_name_en: entity.name_en,
    entity_name_ar: entity.name_ar,
    entity_type: entity.type,
    region: getRegion(entity.city),
    sector: entity.sector,
    location_city: entity.city,
    contact_email: `contact@${entity.code.toLowerCase()}.sa`,
    contact_phone: `+966-11-${String(4000000 + index).slice(-7)}`,
    description: `${entity.name_en} - ${entity.type} in ${entity.city}`,
    status: 'Active',
    total_programs: Math.floor(Math.random() * 5) + 1,
    active_programs: Math.floor(Math.random() * 3) + 1,
    total_budget: (Math.random() * 50000000 + 5000000).toFixed(2),
    created_at: new Date(),
    updated_at: new Date()
  }));

  // Insert in batches
  const batchSize = 50;
  for (let i = 0; i < data.length; i += batchSize) {
    await knex('dga_entities').insert(data.slice(i, i + batchSize));
  }

  console.log(`✅ Successfully seeded ${data.length} government entities`);
  console.log(`   - Central Region: ${data.filter(e => e.region === 'Central').length}`);
  console.log(`   - Western Region: ${data.filter(e => e.region === 'Western').length}`);
  console.log(`   - Eastern Region: ${data.filter(e => e.region === 'Eastern').length}`);
  console.log(`   - Northern Region: ${data.filter(e => e.region === 'Northern').length}`);
  console.log(`   - Southern Region: ${data.filter(e => e.region === 'Southern').length}`);
};

function getRegion(city) {
  const centralCities = ['Riyadh'];
  const westernCities = ['Jeddah', 'Makkah', 'Madinah', 'Taif', 'Yanbu'];
  const easternCities = ['Dammam', 'Dhahran', 'Khobar', 'Jubail', 'Ras Al Khair'];
  const northernCities = ['Tabuk', 'NEOM', 'Al-Jouf', 'Arar'];
  const southernCities = ['Abha', 'Najran', 'Jazan', 'Al-Baha'];

  if (centralCities.includes(city)) return 'Central';
  if (westernCities.includes(city)) return 'Western';
  if (easternCities.includes(city)) return 'Eastern';
  if (northernCities.includes(city)) return 'Northern';
  if (southernCities.includes(city)) return 'Southern';
  
  return 'Central'; // Default
}
